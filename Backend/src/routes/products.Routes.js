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

const productsRouter = express.Router();

productsRouter.get("/products", getAllProducts);
productsRouter.get("/latestproducts", getLatestProducts); 
productsRouter.get("/products/:id", getProductById);
productsRouter.post("/products", authRequired,requireRole("admin"), createProduct);
productsRouter.put("/products/:id", authRequired,requireRole("admin"), editProduct);
productsRouter.patch("/products/:id", authRequired,requireRole("admin"), updateProductStatus);
productsRouter.delete("/products/:id", authRequired,requireRole("admin"), deleteProduct);

module.exports = { productsRouter };
