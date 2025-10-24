const express = require("express");
const categoriesRoutes = express.Router();
const {
  createCategoryCtrl, deleteCategoryCtrl, getAllCategoriesCtrl,updateCategoryCtrl
} = require("../controllers/categories.Controller");
const { authRequired } = require("../middlewares/auth.Middleware");

categoriesRoutes.post("/categories",authRequired, createCategoryCtrl);
categoriesRoutes.get("/categories", getAllCategoriesCtrl);
categoriesRoutes.put("/categories/:id",authRequired, updateCategoryCtrl);
categoriesRoutes.delete("/categories/:id",authRequired, deleteCategoryCtrl);

module.exports = {categoriesRoutes}
