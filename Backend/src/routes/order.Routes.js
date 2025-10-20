const express = require("express");
const { authRequired } = require("../middlewares/auth.Middleware");
const {
  createOrder,
  deleteOrder,
  editOrder,
  getAllOrders,
  getOrderById,
} = require("../controllers/orders.Controller");
const orderRouter = express.Router();

orderRouter.get("/orders", getAllOrders);
orderRouter.get("/orders/:id", getOrderById);
orderRouter.post("/orders", authRequired, createOrder);
orderRouter.put("/orders/:id", authRequired, editOrder);
orderRouter.delete("/orders/:id", authRequired, deleteOrder);

module.exports = { orderRouter };
