const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { pool } = require("../db/db");

async function registerAuth(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: "Fields required " });

    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0)
      return res.status(400).json({ error: "user already exits" });

    const hasedpassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      "INSERT INTO users (username,email,password) VALUES (?,?,?)",
      [username, email, hasedpassword]
    );

    const token = jsonwebtoken.sign(
      { id: result.insertId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      })
      .json({
        message: "User created",
        user: { id: result.insertId, username, email },
      });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function loginAuth(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Fields required " });

    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    const user = rows[0];

    if (!user) return res.status(400).json({ error: "user not exists" });

    const passwordfound = await bcrypt.compare(password, user.password);

    if (!passwordfound)
      return res.status(400).json({ error: "password not found" });

    const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      })
      .json({
        message: "User loged",
        user: { id: user.id, username: user.username, email },
      });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function verifyAuth(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ error: "token not found" });

    const verifytoken = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [
      verifytoken.id,
    ]);

    const validateuser = rows[0];
    if (!validateuser) return res.status(400).json({ error: "user not found" });

    return res.json({ user: validateuser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  registerAuth,
  loginAuth,
  verifyAuth,
};
