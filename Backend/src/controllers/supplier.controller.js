const supplierService = require("../services/suppliers.Service");

async function getAllSuppliers(req, res, next) {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    res.status(200).json({ suppliers });
  } catch (error) {
    next(error);
  }
}

async function getSupplierById(req, res, next) {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id);
    res.status(200).json({ supplier });
  } catch (error) {
    next(error);
  }
}

async function createSupplier(req, res, next) {
  try {
    const { name, phone, email, address } = req.body;
    if (!name || !phone || !email)
      return res.status(400).json({ error: "Fields required" });

    const supplier = await supplierService.createSupplier({
      name,
      phone,
      email,
      address: address || null,
    });
    res.status(201).json({ message: "Supplier created", supplier });
  } catch (error) {
    next(error);
  }
}

async function updateSupplier(req, res, next) {
  try {
    const { id } = req.params;
    const { name, phone, email, address } = req.body;
    if (!id) return res.status(400).json({ error: "Id required" });

    const supplier = await supplierService.updateSupplier({
      id,
      name,
      phone,
      email,
      address: address || null,
    });
    res.status(200).json({ message: "Supplier updated", supplier });
  } catch (error) {
    next(error);
  }
}

async function deleteSupplier(req, res, next) {
  try {
    await supplierService.deleteSupplier(req.params.id);
    res.status(200).json({ message: "Supplier deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
