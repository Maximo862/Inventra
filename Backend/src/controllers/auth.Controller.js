const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { pool } = require("../db/db");

async function loginAuth(req, res) {
  try {
    const { password, email } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Fields required" });

    const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);

    const user = rows[0];

    if (!user) return res.status(400).json({ error: "User not found" });

    const passwordfound = await bcrypt.compare(password, user.password);
    if (!passwordfound)
      return res.status(400).json({ error: "Incorret password" });

    const token = jsonwebtoken.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .json({
        message: "Sucesfull login",
        user: { id: user.id, username: user.username, email },
        token,
      });
  } catch (error) {
    console.log("login: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function registerAuth(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: "Fields required" });

    const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    const user = rows[0];

    if (user) return res.status(400).json({ error: "User already exists" });

    const hasedpassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      `INSERT INTO users (username,email,password) VALUES (?, ?, ?)`,
      [username, email, hasedpassword]
    );

    const token = jsonwebtoken.sign(
      {
        id: result.insertId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .json({
        message: "User Created",
        user: { id: result.insertId, username, email },
      });
  } catch (err) {
    console.log("register: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function verifyAuth(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "No token" });

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    const [rows] = await pool.execute(
      "SELECT id, username, email FROM users WHERE id = ?",
      [decoded.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    return res.json({ user: rows[0] });
  } catch (error) {
    console.error("Verify error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { registerAuth, loginAuth, verifyAuth };
