const express = require("express");
const { authRequired } = require("../middlewares/auth.Middleware");
const {
  createProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getLatestProducts,
  updateProductStatus
} = require("../controllers/products.Controller");
const { requireRole } = require("../middlewares/requireRolre.Middleware");

const productsrouter = express.Router();

productsrouter.get("/products", getAllProducts);
productsrouter.get("/latestproducts", getLatestProducts); 
productsrouter.get("/products/:id", getProductById);
productsrouter.post("/products", authRequired,requireRole("admin"), createProduct);
productsrouter.put("/products/:id", authRequired,requireRole("admin"), editProduct);
productsrouter.patch("/products/:id", authRequired,requireRole("admin"), updateProductStatus);
productsrouter.delete("/products/:id", authRequired,requireRole("admin"), deleteProduct);

module.exports = { productsrouter };
