const { pool } = require("../db/db");
const repo = require("../repositories/products.Repository");

async function getAllProducts() {
  const products = await repo.findAllProducts();
  if (products.length === 0) return [];

  const relations = await repo.findAllProductSuppliers();
  return products.map((p) => {
    const supplierIds = relations
      .filter((r) => r.product_id === p.id)
      .map((r) => r.supplier_id);
    return { ...p, suppliers_Id: supplierIds };
  });
}

async function getProductById(id) {
  const rows = await repo.findProductById(id);
  if (rows.length === 0) throw new Error("Product not found");
  return rows[0];
}

async function createProduct({ name, category_id, price, suppliers_Id, user_id, expiration_date, alert_threshold }) {
  const con = await pool.getConnection();
  await con.beginTransaction();

  try {
    const [result] = await repo.insertProduct(con, {
      name,
      category_id,
      price,
      user_id,
      expiration_date,
      alert_threshold
    });

    const productId = result.insertId;

    for (const supplierId of suppliers_Id) {
      await repo.insertProductSupplier(con, { productId, supplierId });
    }

    await con.commit();
    return { id: productId, name, category_id, price, suppliers_Id ,expiration_date, alert_threshold};
  } catch (error) {
    await con.rollback();
    throw error;
  } finally {
    con.release();
  }
}

async function editProduct({ id, name, category_id, price, suppliers_Id, user_id, expiration_date, alert_threshold}) {
  const con = await pool.getConnection();
  await con.beginTransaction();

  try {
    const [result] = await repo.updateProduct(con, {
      id,
      name,
      category_id,
      price,
      user_id,
      expiration_date,
      alert_threshold
    });

    if (result.affectedRows === 0) throw new Error("Product not found");

    await repo.deleteProductSuppliers(con, id);

    for (const supplierId of suppliers_Id) {
      await repo.insertProductSupplier(con, { productId: id, supplierId });
    }

    await con.commit();
    return { id, name, category_id, price, suppliers_Id,expiration_date, alert_threshold };
  } catch (error) {
    await con.rollback();
    throw error;
  } finally {
    con.release();
  }
}

async function deleteProduct(id) {
  const con = await pool.getConnection();
  await con.beginTransaction();

  try {
    await repo.deleteProductSuppliers(con, id);
    const [result] = await repo.deleteProduct(con, id);

    if (result.affectedRows === 0) throw new Error("Product not found");

    await con.commit();
    return true;
  } catch (error) {
    await con.rollback();
    throw error;
  } finally {
    con.release();
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
};
