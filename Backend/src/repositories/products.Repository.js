const { pool } = require("../db/db");

async function findAllProducts(activeOnly = true) {
  const condition = activeOnly
    ? "WHERE p.isActive = true"
    : "WHERE p.isActive = false";
  const [products] = await pool.execute(`
    SELECT 
      p.*, 
      COALESCE(SUM(
        CASE 
          WHEN o.type = 'entrada' THEN o.quantity
          WHEN o.type = 'salida' THEN -o.quantity
          ELSE 0 
        END
      ), 0) AS stock
    FROM products p
    LEFT JOIN orders o ON p.id = o.product_id
    ${condition}
    GROUP BY p.id
  `);
  return products;
}

async function updateInactiveProducts(id, isActive) {
  return await pool.execute("UPDATE products SET isActive = ? WHERE id = ?", [
    isActive,
    id,
  ]);
}

async function findLatestProducts() {
  const [products] = await pool.execute(`
    SELECT *
    FROM products ORDER BY created_at DESC LIMIT 5
  `);
  return products;
}

async function findAllProductSuppliers() {
  const [rows] = await pool.execute("SELECT * FROM product_suppliers");
  return rows;
}

async function findProductById(id) {
  const [rows] = await pool.execute(
    `
    SELECT 
      p.*, 
      COALESCE(SUM(
        CASE 
          WHEN o.type = 'entrada' THEN o.quantity
          WHEN o.type = 'salida' THEN -o.quantity
          ELSE 0 
        END
      ), 0) AS stock
    FROM products p
    LEFT JOIN orders o ON p.id = o.product_id
    WHERE p.id = ?
    GROUP BY p.id
    `,
    [id]
  );
  return rows;
}

async function insertProduct(
  con,
  { name, category_id, price, user_id, expiration_date, alert_threshold }
) {
  return con.execute(
    "INSERT INTO products (name, category_id, price, user_id, expiration_date, alert_threshold) VALUES (?, ?, ?, ?, ?, ?)",
    [name, category_id, price, user_id, expiration_date, alert_threshold]
  );
}

async function insertProductSupplier(con, { productId, supplierId }) {
  return con.execute(
    "INSERT INTO product_suppliers (product_id, supplier_id) VALUES (?, ?)",
    [productId, supplierId]
  );
}

async function updateProduct(
  con,
  { id, name, category_id, price, user_id, expiration_date, alert_threshold }
) {
  return con.execute(
    "UPDATE products SET name = COALESCE(?, name), category_id = COALESCE(?, category_id), price = COALESCE(?, price), expiration_date = ?, alert_threshold = ? WHERE id = ? AND user_id = ?",
    [name, category_id, price, expiration_date, alert_threshold, id, user_id]
  );
}

async function deleteProductSuppliers(con, id) {
  return con.execute("DELETE FROM product_suppliers WHERE product_id = ?", [
    id,
  ]);
}

async function deleteProduct(con, id) {
  return con.execute("DELETE FROM products WHERE id = ?", [id]);
}

module.exports = {
  findAllProducts,
  findAllProductSuppliers,
  findProductById,
  insertProduct,
  insertProductSupplier,
  updateProduct,
  deleteProductSuppliers,
  deleteProduct,
  findLatestProducts,
  updateInactiveProducts,
};
