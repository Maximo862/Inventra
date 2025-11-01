const { pool } = require("../db/db");

async function findUserByEmail(email) {
  const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return rows[0];
}

async function findUserById(id) {
  const [rows] = await pool.execute(
    `SELECT id, username, email, role FROM users WHERE id = ?`,
    [id]
  );
  return rows[0];
}

async function createUser(username, email, hashedPassword, role) {
  const [result] = await pool.execute(
    `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
    [username, email, hashedPassword, role]
  );
  return result.insertId;
}

async function getUsersDB() {
  const [rows] = await pool.execute(
    `SELECT id, username, email, role FROM users`
  );
  return rows;
}

async function updateUserDB(id, username, email, role) {
  const [result] = await pool.execute(
    `UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?`,
    [username, email, role, id]
  );
  return result.affectedRows;
}

async function deleteUserDB(id) {
  const [result] = await pool.execute(`DELETE FROM users WHERE id = ?`, [id]);
  return result.affectedRows;
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  getUsersDB,
  updateUserDB,
  deleteUserDB,
};
