const express = require("express");
const categoriesRoutes = express.Router();
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.Controller");
const { authRequired } = require("../middlewares/auth.Middleware");

categoriesRoutes.post("/categories",authRequired, createCategory);
categoriesRoutes.get("/categories", getAllCategories);
categoriesRoutes.put("/categories/:id",authRequired, updateCategory);
categoriesRoutes.delete("/categories/:id",authRequired, deleteCategory);

module.exports = {categoriesRoutes}
