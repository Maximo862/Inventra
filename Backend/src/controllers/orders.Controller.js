const { findLatestOrders } = require("../repositories/orders.Repository");
const {
  createOrderService,
  deleteOrderService,
  editOrderService,
  getAllOrdersService,
  getOrderByIdService,
} = require("../services/orders.Service");

async function getAllOrders(req, res, next) {
  try {
    const orders = await getAllOrdersService();
    if (orders.length === 0) return res.status(200).json([]);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

async function getLatestOrders(req, res, next) {
  try {
    const orders = await findLatestOrders();
    return res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const order = await getOrderByIdService(req.params.id);
    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const { product_id, quantity, type } = req.body;
    const user_id = req.theuser.id;
    const order = await createOrderService({
      product_id,
      quantity,
      type,
      user_id,
    });
    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    next(error);
  }
}

async function editOrder(req, res, next) {
  try {
    const order = await editOrderService({ id: req.params.id, ...req.body });
    res.status(200).json({ message: "Order updated", order });
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const id = await deleteOrderService(req.params.id);
    res.status(200).json({ message: "Order deleted", id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  editOrder,
  deleteOrder,
  getLatestOrders,
};
