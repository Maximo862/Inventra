const supplierService = require("../services/suppliers.Service");

async function getAllSuppliers(req, res) {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    res.status(200).json({ suppliers });
  } catch (error) {
    console.error("getAllSuppliers:", error.message);
    res.status(500).json({ error: "Error getting suppliers" });
  }
}

async function getSupplierById(req, res) {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id);
    res.status(200).json({ supplier });
  } catch (error) {
    console.error("getSupplierById:", error.message);
    const status = error.message === "Supplier not found" ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
}

async function createSupplier(req, res) {
  try {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email)
      return res.status(400).json({ error: "Fields required" });

    const supplier = await supplierService.createSupplier({
      name,
      phone,
      email,
    });
    res.status(201).json({ message: "Supplier created", supplier });
  } catch (error) {
    console.error("createSupplier:", error.message);
    const status = error.message === "Supplier already exists" ? 400 : 500;
    res.status(status).json({ error: error.message });
  }
}

async function updateSupplier(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, email } = req.body;
    if (!id) return res.status(400).json({ error: "Id required" });

    const supplier = await supplierService.updateSupplier({
      id,
      name,
      phone,
      email,
    });
    res.status(200).json({ message: "Supplier updated", supplier });
  } catch (error) {
    console.error("updateSupplier:", error.message);
    const status = error.message === "Supplier not found" ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
}

async function deleteSupplier(req, res) {
  try {
    await supplierService.deleteSupplier(req.params.id);
    res.status(200).json({ message: "Supplier deleted" });
  } catch (error) {
    console.error("deleteSupplier:", error.message);
    const status = error.message === "Supplier not found" ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
}

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
