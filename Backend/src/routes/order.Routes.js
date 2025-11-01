const express = require("express");
const { authRequired } = require("../middlewares/auth.Middleware");
const {
  createOrder,
  deleteOrder,
  editOrder,
  getAllOrders,
  getOrderById,
  getLatestOrders
} = require("../controllers/orders.Controller");
const {requireRole} = require("../middlewares/requireRolre.Middleware")
const orderRouter = express.Router();

orderRouter.get("/orders", getAllOrders);
orderRouter.get("/latestorders", getLatestOrders);
orderRouter.get("/orders/:id", getOrderById);
orderRouter.post("/orders", authRequired,requireRole("admin"), createOrder);
orderRouter.put("/orders/:id", authRequired,requireRole("admin"), editOrder);
orderRouter.delete("/orders/:id", authRequired,requireRole("admin"), deleteOrder);

module.exports = { orderRouter };
