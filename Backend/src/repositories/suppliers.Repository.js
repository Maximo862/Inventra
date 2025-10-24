const { pool } = require("../db/db");

async function findAll() {
  const [rows] = await pool.execute("SELECT * FROM suppliers");
  return rows;
}

async function findById(id) {
  const [rows] = await pool.execute("SELECT * FROM suppliers WHERE id = ?", [id]);
  return rows[0];
}

async function findByEmail(email) {
  const [rows] = await pool.execute("SELECT * FROM suppliers WHERE email = ?", [email]);
  return rows[0];
}

async function insert({ name, phone, email }) {
  const [result] = await pool.execute(
    "INSERT INTO suppliers (name, phone, email) VALUES (?, ?, ?)",
    [name, phone, email]
  );
  return result.insertId;
}

async function update({ id, name, phone, email }) {
  await pool.execute(
    "UPDATE suppliers SET name = COALESCE(?, name), phone = COALESCE(?, phone), email = COALESCE(?, email) WHERE id = ?",
    [name, phone, email, id]
  );
}

async function remove(id) {
  await pool.execute("DELETE FROM suppliers WHERE id = ?", [id]);
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  insert,
  update,
  remove,
};
