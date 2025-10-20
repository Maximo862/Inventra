const { pool } = require("../db/db");

async function getAllOrders(req, res) {
  try {
    const [orders] = await pool.execute(
      `SELECT o.*, 
              p.name AS product_name,
              p.price AS product_price,
              u.username AS user_name
       FROM orders o
       JOIN products p ON o.product_id = p.id
       JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );
 if (orders.length === 0) return res.status(200).json([]);
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      `SELECT o.*, 
              p.name AS product_name, 
              u.username AS user_name
       FROM orders o
       JOIN products p ON o.product_id = p.id
       JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [id]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "order not found" });

    return res.status(200).json({ order: rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
}

async function createOrder(req, res) {
  const con = await pool.getConnection();
  await con.beginTransaction();

  try {
    const { product_id, quantity, type } = req.body;
    const user_id = req.theuser.id;

    if (!product_id || !quantity || !type)
      return res.status(400).json({ error: "fields required" });

    // Verificar que el producto exista
    const [productRows] = await con.execute(
      "SELECT * FROM products WHERE id = ?",
      [product_id]
    );
    if (productRows.length === 0)
      return res.status(404).json({ error: "product not found" });

    const product = productRows[0];

    // ✅ Calcular total (pero no tocar el stock)
    const total = Number((product.price * quantity).toFixed(2));

    // ✅ Insertar la orden
    const [orderResult] = await con.execute(
      `INSERT INTO orders (quantity, total, type, user_id, product_id)
       VALUES (?, ?, ?, ?, ?)`,
      [quantity, total, type, user_id, product_id]
    );

    await con.commit();

    return res.status(201).json({
      message: "Order created",
      order: {
        id: orderResult.insertId,
        product_id,
        user_id,
        quantity,
        type,
        total,
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

async function editOrder(req, res) {
  try {
    const { id } = req.params;
    const { quantity, type, total } = req.body;

    const [result] = await pool.execute(
      `UPDATE orders 
       SET quantity = COALESCE(?, quantity),
           type = COALESCE(?, type),
           total = COALESCE(?, total)
       WHERE id = ?`,
      [quantity, type, total, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "order not found" });

    return res.status(200).json({
      message: "Order updated",
      order: { id, quantity, type, total },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
}

async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.execute(`DELETE FROM orders WHERE id = ?`, [
      id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "order not found" });

    return res.status(200).json({ message: "Order deleted", id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "server error" });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  editOrder,
  deleteOrder,
};
