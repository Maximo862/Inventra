const { Router } = require("express");
const {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
} = require("../controllers/supplier.controller.js");
const { authRequired } = require("../middlewares/auth.Middleware");

const supplierRoutes = Router();

supplierRoutes.get("/suppliers", getAllSuppliers);
supplierRoutes.get("/suppliers/:id", getSupplierById);
supplierRoutes.post("/suppliers",authRequired, createSupplier);
supplierRoutes.put("/suppliers/:id",authRequired, updateSupplier);
supplierRoutes.delete("/suppliers/:id",authRequired, deleteSupplier);

module.exports = {
  supplierRoutes,
};
