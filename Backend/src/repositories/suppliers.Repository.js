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

async function insert({ name, phone, email, address }) {
  const [result] = await pool.execute(
    "INSERT INTO suppliers (name, phone, email, address) VALUES (?, ?, ?, ?)",
    [name, phone, email, address]
  );
  return result.insertId;
}

async function update({ id, name, phone, email, address }) {
  await pool.execute(
    "UPDATE suppliers SET name = COALESCE(?, name), phone = COALESCE(?, phone), email = COALESCE(?, email), address = ? WHERE id = ?",
    [name, phone, email,address, id]
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
