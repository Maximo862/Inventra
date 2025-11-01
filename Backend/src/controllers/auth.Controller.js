const {
  registerUser,
  loginUser,
  verifyUser,
} = require("../services/auth.Service");

async function registerAuth(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: "Fields required" });

    const userData = await registerUser({
      username,
      email,
      password,
      role: "employee",
    });

    res
      .cookie("token", userData.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .json({
        message: "User Created",
        user: { id: userData.id, username, email, role: userData.role },
      });
  } catch (err) {
    console.error("register:", err.message);
    const status = err.message === "User already exists" ? 400 : 500;
    res.status(status).json({ error: err.message });
  }
}

async function loginAuth(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Fields required" });

    const userData = await loginUser({ email, password });

    res
      .cookie("token", userData.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .json({
        message: "Successful login",
        user: {
          id: userData.id,
          username: userData.username,
          email,
          role: userData.role,
        },
      });
  } catch (err) {
    console.error("login:", err.message);
    console.error("login:", err);
    const status =
      err.message === "User not found" || err.message === "Incorrect password"
        ? 400
        : 500;
    res.status(status).json({ error: err.message });
  }
}

async function verifyAuth(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "No token" });

    const user = await verifyUser(token);
    res.json({ user });
  } catch (err) {
    console.error("verify:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
}

async function logoutAuth(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Logout successful" });
  } catch (err) {
    console.error("logout:", err.message);
    res.status(500).json({ error: "Error during logout" });
  }
}

module.exports = { registerAuth, loginAuth, verifyAuth, logoutAuth };
