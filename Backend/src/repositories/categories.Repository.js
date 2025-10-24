const { pool } = require("../db/db");

async function createCategoryDB(name) {
  const [result] = await pool.execute(
    "INSERT INTO categories (name) VALUES (?)",
    [name]
  );
  return result.insertId;
}

async function getAllCategoriesDB() {
  const [rows] = await pool.execute("SELECT * FROM categories");
  return rows;
}

async function updateCategoryDB(id, name) {
  const [result] = await pool.execute(
    `UPDATE categories SET name = COALESCE(?, name) WHERE id = ?`,
    [name, id]
  );
  return result;
}

async function deleteCategoryDB(id) {
  const [result] = await pool.execute("DELETE FROM categories WHERE id = ?", [
    id,
  ]);
  return result;
}

async function categoryInUse(id) {
  const [rows] = await pool.execute(
    "SELECT COUNT(*) AS total FROM products WHERE category_id = ?",
    [id]
  );
  return rows[0].total > 0;
}

module.exports = {
  createCategoryDB,
  getAllCategoriesDB,
  updateCategoryDB,
  deleteCategoryDB,
  categoryInUse,
};
