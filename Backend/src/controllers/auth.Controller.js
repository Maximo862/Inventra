const {
  registerUser,
  loginUser,
  verifyUser,
} = require("../services/auth.Service");

async function registerAuth(req, res, next) {
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
    next(err);
  }
}

async function loginAuth(req, res, next) {
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
    next(err);
  }
}

async function verifyAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "No token" });

    const user = await verifyUser(token);
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

async function logoutAuth(req, res, next) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Logout successful" });
  } catch (err) {
    next(err);
  }
}

module.exports = { registerAuth, loginAuth, verifyAuth, logoutAuth };
