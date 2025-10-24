const supplierRepository = require("../repositories/suppliers.Repository");

async function getAllSuppliers() {
  const suppliers = await supplierRepository.findAll();
  return suppliers;
}

async function getSupplierById(id) {
  const supplier = await supplierRepository.findById(id);
  if (!supplier) throw new Error("Supplier not found");
  return supplier;
}

async function createSupplier({ name, phone, email }) {
  const existing = await supplierRepository.findByEmail(email);
  if (existing) throw new Error("Supplier already exists");

  const supplierId = await supplierRepository.insert({ name, phone, email });
  return { id: supplierId, name, phone, email };
}

async function updateSupplier({ id, name, phone, email }) {
  const found = await supplierRepository.findById(id);
  if (!found) throw new Error("Supplier not found");

  await supplierRepository.update({ id, name, phone, email });
  return { id, name, phone, email };
}

async function deleteSupplier(id) {
  const found = await supplierRepository.findById(id);
  if (!found) throw new Error("Supplier not found");

  await supplierRepository.remove(id);
}

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
