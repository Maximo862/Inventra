const { pool } = require("../db/db");

async function getAllProducts(req, res) {
  try {
    const [products] =
      await pool.execute(`SELECT p.*, COALESCE(SUM(CASE WHEN o.type = 'entrada' THEN o.quantity
                         WHEN o.type = 'salida' THEN -o.quantity ELSE 0 END ), 0) AS stock FROM products p LEFT JOIN orders o ON p.id = o.product_id GROUP BY p.id`);
    if (products.length === 0) return res.status(200).json({ products: [] });
    const [product_suppliersIds] = await pool.execute(
      "SELECT * FROM product_suppliers"
    );
    const productsWithSuppliersIds = products.map((p) => {
      const supplieridForProduct = product_suppliersIds
        .filter((ps) => ps.product_id === p.id)
        .map((ps) => ps.supplier_id);
      return { ...p, suppliers_Id: supplieridForProduct };
    });

    return res.status(200).json({ products: productsWithSuppliersIds });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute(
      `SELECT p.*, COALESCE(SUM(CASE WHEN o.type = 'entrada' THEN o.quantity
                         WHEN o.type = 'salida' THEN -o.quantity ELSE 0 END ), 0) AS stock FROM products p LEFT JOIN orders o ON p.id = o.product_id WHERE p.id = ? GROUP BY p.id`,
      [id]
    );
    if (rows.length === 0)
      return res.status(400).json({ error: "product not found" });
    return res.status(200).json({ product: rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
}

async function createProduct(req, res) {
  const con = await pool.getConnection();
  await con.beginTransaction();
  try {
    const { name, category_id, price, suppliers_Id = [] } = req.body;
    if (!name || !category_id || !price || !suppliers_Id)
      return res.status(400).json({ error: "fields required" });

    const [result] = await con.execute(
      "INSERT INTO products (name, category_id, price, user_id) VALUES (?, ?, ?, ?)",
      [name, category_id, price, req.theuser.id]
    );
    if (result.affectedRows === 0)
      return res.status(400).json({ error: "product not found" });

    for (const supplierId of suppliers_Id) {
      await con.execute(
        "INSERT INTO product_suppliers (product_id, supplier_id) VALUES (?, ?)",
        [result.insertId, supplierId]
      );
    }

    await con.commit();

    return res.status(201).json({
      message: "Product created",
      product: {
        id: result.insertId,
        name,
        category_id,
        price,
        user_id: req.theuser.id,
        suppliers_Id,
      },
    });
  } catch (error) {
    await con.rollback();
    console.error(error);
    return res.status(500).json({ error: "server error" });
  } finally {
    con.release();
  }
}

async function editProduct(req, res) {
  const con = await pool.getConnection();
  await con.beginTransaction();
  try {
    const { id } = req.params;
    const { name, category_id, price, suppliers_Id = [] } = req.body;
    if (!name || !category_id || !price || !suppliers_Id)
      return res.status(400).json({ error: "fields required" });

    const [result] = await con.execute(
      "UPDATE products SET name = COALESCE(?, name), category_id = COALESCE(?, category_id), price = COALESCE(?, price) WHERE id = ? AND user_id = ?",
      [name, category_id, price, id, req.theuser.id]
    );
    if (result.affectedRows === 0)
      return res.status(400).json({ error: "product not found" });

    await con.execute("DELETE FROM product_suppliers WHERE product_id = ?", [
      id,
    ]);

    for (const supplierid of suppliers_Id) {
      await con.execute(
        "INSERT INTO product_suppliers (product_id, supplier_id) VALUES (?, ?)",
        [id, supplierid]
      );
    }

    await con.commit();

    return res.status(201).json({
      message: "Product edited",
      product: {
        id,
        name,
        category_id,
        price,
        user_id: req.theuser.id,
        suppliers_Id,
      },
    });
  } catch (error) {
    await con.rollback();
    console.error(error);
    return res.status(500).json({ error: "server error" });
  } finally {
    con.release();
  }
}

async function deleteProduct(req, res) {
  const con = await pool.getConnection();
  await con.beginTransaction();
  try {
    const { id } = req.params;
    await con.execute("DELETE FROM product_suppliers WHERE product_id = ?", [
      id,
    ]);
    const [result] = await con.execute("DELETE FROM products WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0)
      return res.status(400).json({ error: "product not found" });
    await con.commit();
    return res.status(200).json({ message: "product deleted", id });
  } catch (error) {
    await con.rollback();
    console.log(error);
    return res.status(500).json({ error: "server error" });
  } finally {
    con.release();
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
};
