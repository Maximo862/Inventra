const { pool } = require("../db/db");

async function getAllProducts(req, res) {
  try {
    const [rows] = await pool.execute("SELECT * FROM products");
    if (rows.length === 0)
      return res.status(400).json({ error: "products not found" });
    return res.status(200).json({ products: rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0)
      return res.status(400).json({ error: "product not found" });
    return res.status(200).json({ product: rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
}

async function createProduct(req, res) {
  try {
    const { name, category, price, stock } = req.body;
    if (!name || !category || !price || !stock)
      return res.status(400).json({ error: "fields required" });

    const [result] = await pool.execute(
      "INSERT INTO products (name, category, price, stock, user_id) VALUES (?, ?, ?, ?, ?)",
      [name, category, price, stock, req.theuser.id]
    );
    if (result.affectedRows === 0)
      return res.status(400).json({ error: "product not found" });

    return res.status(201).json({
      message: "Product created",
      product: {
        id: result.insertId,
        name,
        category,
        price,
        stock,
        user_id: req.theuser.id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
}

async function editProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, category, price, stock } = req.body;
    if (!name || !category || !price || !stock)
      return res.status(400).json({ error: "fields required" });

    const [result] = await pool.execute(
      "UPDATE products SET name = COALESCE(?, name), category = COALESCE(?, category), price = COALESCE(?, price), stock = COALESCE(?, stock) WHERE id = ? AND user_id = ?",
      [name, category, price, stock, id, req.theuser.id]
    );
    if (result.affectedRows === 0)
      return res.status(400).json({ error: "product not found" });

    return res.status(201).json({
      message: "Product edited",
      product: {
        id,
        name,
        category,
        price,
        stock,
        user_id: req.theuser.id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      "DELETE FROM products WHERE id = ? AND user_id = ?",
      [id, req.theuser.id]
    );
    if (result.affectedRows === 0)
      return res.status(400).json({ error: "product not found" });
    return res.status(200).json({ message: "product deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
};
