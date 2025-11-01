const { findLatestOrders } = require("../repositories/orders.Repository");
const {
  createOrderService,
  deleteOrderService,
  editOrderService,
  getAllOrdersService,
  getOrderByIdService,
} = require("../services/orders.Service");

async function getAllOrders(req, res) {
  try {
    const orders = await getAllOrdersService();
    if (orders.length === 0) return res.status(200).json([]);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
}

async function getLatestOrders(req,res) {
  try {
    const orders = await findLatestOrders()
return res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}


async function getOrderById(req, res) {
  try {
    const order = await getOrderByIdService(req.params.id);
    res.status(200).json({ order });
  } catch (error) {
    const status = error.message === "order not found" ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
}

async function createOrder(req, res) {
  try {
    const { product_id, quantity, type } = req.body;
    const user_id = req.theuser.id;
    const order = await createOrderService({ product_id, quantity, type, user_id });
    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
}

async function editOrder(req, res) {
  try {
    const order = await editOrderService({ id: req.params.id, ...req.body });
    res.status(200).json({ message: "Order updated", order });
  } catch (error) {
    const status = error.message === "order not found" ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
}

async function deleteOrder(req, res) {
  try {
    const id = await deleteOrderService(req.params.id);
    res.status(200).json({ message: "Order deleted", id });
  } catch (error) {
    const status = error.message === "order not found" ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  editOrder,
  deleteOrder,
  getLatestOrders
};
