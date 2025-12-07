const { pool } = require("../db/db");
const {
  deleteOrder,
  findAllOrders,
  findOrderById,
  findProductById,
  insertOrder,
  updateOrder,
  findLatestOrders,
} = require("../repositories/orders.Repository");

async function getAllOrdersService() {
  const [orders] = await findAllOrders();
  return orders;
}

async function getLatestProducts() {
  const orders = await findLatestOrders();
  if (orders.length === 0) return [];
  return orders;
}

async function getOrderByIdService(id) {
  const [rows] = await findOrderById(id);
  if (rows.length === 0) throw new Error("order not found");
  return rows[0];
}

async function createOrderService({ product_id, quantity, type, user_id }) {
  const con = await pool.getConnection();
  await con.beginTransaction();

  try {
    const [productRows] = await findProductById(con, product_id);
    if (productRows.length === 0) throw new Error("product not found");

    const product = productRows[0];
    const total = Number((product.price * quantity).toFixed(2));

    const [orderResult] = await insertOrder(con, {
      quantity,
      total,
      type,
      user_id,
      product_id,
    });

    await con.commit();
    return {
      id: orderResult.insertId,
      product_id,
      user_id,
      quantity,
      type,
      total,
    };
  } catch (err) {
    await con.rollback();
    throw err;
  } finally {
    con.release();
  }
}

async function editOrderService({ id, quantity, type }) {
  const con = await pool.getConnection();
  await con.beginTransaction();
  try {
    const [orderRows] = await findOrderById(id);
    if (orderRows.length === 0) throw new Error("order not found");
    const order = orderRows[0];
    const [productRows] = await findProductById(con, order.product_id);
    if (productRows.length === 0) throw new Error("product not found");
    const product = productRows[0];

    const total = Number((product.price * quantity).toFixed(2));

    await updateOrder({
      id,
      quantity,
      total,
      type,
    }, con);

    await con.commit();
    return {
      id,
      quantity,
      type,
      total,
    };
  } catch (err) {
    await con.rollback();
    throw err;
  } finally {
    con.release();
  }
}

async function deleteOrderService(id) {
  const [result] = await deleteOrder(id);
  if (result.affectedRows === 0) throw new Error("order not found");
  return id;
}

module.exports = {
  getAllOrdersService,
  getOrderByIdService,
  createOrderService,
  editOrderService,
  deleteOrderService,
  getLatestProducts,
};
