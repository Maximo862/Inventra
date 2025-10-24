const productService = require("../services/products.Service");

async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function getProductById(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);
    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    const status = err.message === "Product not found" ? 400 : 500;
    return res.status(status).json({ error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const { name, category_id, price, suppliers_Id = [], expiration_date, alert_threshold} = req.body;
    if (!name || !category_id || !price)
      return res.status(400).json({ error: "Missing fields" });

    const product = await productService.createProduct({
      name,
      category_id,
      price,
      suppliers_Id,
      user_id: req.theuser.id,
      expiration_date : expiration_date || null,
      alert_threshold : alert_threshold || null,
    });

    return res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function editProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, category_id, price, suppliers_Id = [], expiration_date, alert_threshold } = req.body;

    const product = await productService.editProduct({
      id,
      name,
      category_id,
      price,
      suppliers_Id,
      user_id: req.theuser.id,
      expiration_date : expiration_date || null,
      alert_threshold : alert_threshold || null
    });

    return res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.error(error);
    const status = err.message === "Product not found" ? 400 : 500;
    return res.status(status).json({ error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    await productService.deleteProduct(req.params.id);
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    const status = err.message === "Product not found" ? 400 : 500;
    return res.status(status).json({ error: error.message });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
};
