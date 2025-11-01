const { pool } = require("../db/db");

async function findAllOrders() {
  return pool.execute(`
    SELECT o.*, 
           p.name AS product_name,
           p.price AS product_price,
           u.username AS user_name
    FROM orders o
    JOIN products p ON o.product_id = p.id
    JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
  `);
}

async function findLatestOrders() {
  const [orders] = await pool.execute(`
    SELECT *
    FROM orders ORDER BY created_at DESC LIMIT 5
  `);
  return orders;
}

async function findOrderById(id) {
  return pool.execute(
    `
    SELECT o.*, 
           p.name AS product_name, 
           u.username AS user_name
    FROM orders o
    JOIN products p ON o.product_id = p.id
    JOIN users u ON o.user_id = u.id
    WHERE o.id = ?
  `,
    [id]
  );
}

async function insertOrder(
  con,
  { quantity, total, type, user_id, product_id }
) {
  return con.execute(
    `INSERT INTO orders (quantity, total, type, user_id, product_id)
     VALUES (?, ?, ?, ?, ?)`,
    [quantity, total, type, user_id, product_id]
  );
}

async function updateOrder({ id, quantity, type, total }) {
  return pool.execute(
    `
    UPDATE orders 
    SET quantity = COALESCE(?, quantity),
        type = COALESCE(?, type),
        total = COALESCE(?, total)
    WHERE id = ?
  `,
    [quantity, type, total, id]
  );
}

async function deleteOrder(id) {
  return pool.execute(`DELETE FROM orders WHERE id = ?`, [id]);
}

async function findProductById(con, id) {
  return con.execute(`SELECT * FROM products WHERE id = ?`, [id]);
}

module.exports = {
  findAllOrders,
  findOrderById,
  insertOrder,
  updateOrder,
  deleteOrder,
  findProductById,
  findLatestOrders,
};
