const jwt = require("jsonwebtoken");

async function authRequired(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(400).json({ error: "Unauthorized" });

    req.theuser = decoded;

    next();
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = {
  authRequired,
};
