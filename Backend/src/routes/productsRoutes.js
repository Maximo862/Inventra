const express = require("express");
const { authRequired } = require("../middlewares/authMiddleware");
const { createProduct } = require("../controllers/productsController");

const productsrouter = express.Router();

productsrouter.get("/products");

productsrouter.get("/products/:id");

productsrouter.post("/products", authRequired, createProduct);

productsrouter.put("/products/:id");

productsrouter.delete("/products:id");

module.exports = {
  productsrouter,
};
