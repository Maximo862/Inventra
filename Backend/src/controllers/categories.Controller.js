const { pool } = require("../db/db");

async function createCategory(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const [result] = await pool.execute(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );

    res.status(201).json({
      message: "Category created",
      category: { id: result.insertId, name },
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllCategories(req, res) {
  try {
    const [rows] = await pool.execute("SELECT * FROM categories");

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const [result] = await pool.execute(
      `UPDATE categories 
       SET name = COALESCE(?, name)
       WHERE id = ?`,
      [name, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Category not found" });

    res.status(200).json({ message: "Category updated", category: id, name });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    const [result] = await pool.execute("DELETE FROM categories WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Category not found" });

    const [used] = await con.execute(
      "SELECT COUNT(*) AS total FROM products WHERE category_id = ?",
      [id]
    );
    if (used[0].total > 0)
      return res.status(400).json({ error: "Category in use by products" });

    res.status(200).json({ message: "Category deleted", id });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
