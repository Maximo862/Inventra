import { pool } from "../db/db";

async function getAllSuppliers(req, res) {
  try {
    const [rows] = await pool.execute("SELECT * FROM suppliers");
    res.json({ suppliers: rows });
  } catch (error) {
    res.status(500).json({ error: "Error getting suppliers" });
  }
}

async function getSupplierById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute("SELECT * FROM suppliers WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json({ supplier: rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error getting supplier" });
  }
}

async function createSupplier(req, res) {
  try {
    const { name, contact, phone, email } = req.body;
    const [result] = await pool.execute(
      "INSERT INTO suppliers (name, contact, phone, email) VALUES (?, ?, ?, ?)",
      [name, contact, phone, email]
    );

    res.status(201).json({
      supplier: { id: result.insertId, name, contact, phone, email },
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating supplier" });
  }
}

async function updateSupplier(req, res) {
  try {
    const { id } = req.params;
    const { name, contact, phone, email } = req.body;

    const [result] = await pool.execute(
      "UPDATE suppliers SET name=?, contact=?, phone=?, email=? WHERE id=?",
      [name, contact, phone, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.json({ supplier: { id, name, contact, phone, email } });
  } catch (error) {
    res.status(500).json({ error: "Error updating supplier" });
  }
}

async function deleteSupplier(req, res) {
  try {
    const { id } = req.params;

    const [result] = await pool.execute("DELETE FROM suppliers WHERE id=?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.json({ message: "Supplier deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting supplier" });
  }
}

module.exports = {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
};
