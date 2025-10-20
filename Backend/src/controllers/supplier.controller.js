const { pool } = require("../db/db");

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
    const { name, phone, email } = req.body;
    console.log("recibido backend: ", name, phone, email);
    const [result] = await pool.execute(
      "INSERT INTO suppliers (name, phone, email) VALUES (?,?,?)",
      [name, phone, email]
    );
    console.log("result: ", result);
    res.status(201).json({
      supplier: { id: result.insertId, name, phone, email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating supplier" });
  }
}

async function updateSupplier(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, email } = req.body;

    const [result] = await pool.execute(
      "UPDATE suppliers SET name=COALESCE(?,name), phone=COALESCE(?,phone), email=COALESCE(?,email) WHERE id=?",
      [name, phone, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.json({ supplier: { id, name, phone, email } });
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
