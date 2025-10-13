const express = require("express");
const { authRequired } = require("../middlewares/auth.Middleware");
const {
  createProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/products.Controller");

const productsrouter = express.Router();

productsrouter.get("/products", getAllProducts);
productsrouter.get("/products/:id", getProductById);
productsrouter.post("/products", authRequired, createProduct);
productsrouter.put("/products/:id", authRequired, editProduct);
productsrouter.delete("/products/:id", authRequired, deleteProduct);

module.exports = { productsrouter };
