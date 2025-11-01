const express = require("express");
const categoriesRoutes = express.Router();
const {
  createCategoryCtrl, deleteCategoryCtrl, getAllCategoriesCtrl,updateCategoryCtrl
} = require("../controllers/categories.Controller");
const { authRequired } = require("../middlewares/auth.Middleware");
const { requireRole } = require("../middlewares/requireRolre.Middleware");

categoriesRoutes.post("/categories",authRequired,requireRole("admin"), createCategoryCtrl);
categoriesRoutes.get("/categories", getAllCategoriesCtrl);
categoriesRoutes.put("/categories/:id",authRequired,requireRole("admin"), updateCategoryCtrl);
categoriesRoutes.delete("/categories/:id",authRequired,requireRole("admin"), deleteCategoryCtrl);

module.exports = {categoriesRoutes}
