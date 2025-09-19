const jwt = require("jsonwebtoken");
const { pool } = require("../db/db");

async function verifyToken(token) {
    try {
        const verifytoken = jwt.verify(token, process.env.JWT_SECRET)

const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [verifytoken.id])
if (rows.length === 0) return null

return rows[0]
    } catch (error) {
        console.error(error)
        return null;
    }
}

module.exports = {
    verifyToken
}