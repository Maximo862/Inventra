const { Router } = require("express");
const {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
} = require("../controllers/supplier.controller.js");
const { authRequired } = require("../middlewares/auth.Middleware");
const { requireRole } = require("../middlewares/requireRolre.Middleware.js");

const supplierRoutes = Router();

supplierRoutes.get("/suppliers", getAllSuppliers);
supplierRoutes.get("/suppliers/:id", getSupplierById);
supplierRoutes.post("/suppliers",authRequired,requireRole("admin"), createSupplier);
supplierRoutes.put("/suppliers/:id",authRequired,requireRole("admin"), updateSupplier);
supplierRoutes.delete("/suppliers/:id",authRequired,requireRole("admin"), deleteSupplier);

module.exports = {
  supplierRoutes,
};
