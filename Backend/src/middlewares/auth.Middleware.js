const jwt = require("jsonwebtoken");

function authRequired(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.theuser = decoded;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { authRequired };
