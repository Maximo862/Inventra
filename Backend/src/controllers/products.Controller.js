const productService = require("../services/products.Service");

async function getAllProducts(req, res, next) {
  try {
    const activeParam = req.query.active;
    const activeOnly = activeParam === "false" ? false : true; 
    const products = await productService.getAllProducts(activeOnly);
    return res.status(200).json({ products });
  } catch (error) { 
next(error)
  }
}

async function getLatestProducts(req,res,next) {
  try {
    const products = await productService.getLatestProducts()
return res.status(200).json({ products });
  } catch (error) {
 next(error)
  }
}

async function updateProductStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    await productService.updateProductStatus(id, isActive);
    return res.status(200).json({ message: "Product Updated" });
  } catch (error) {
next(error)
  }
}


async function getProductById(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    return res.status(200).json({ product });
  } catch (error) {
   next(error)
  }
}

async function createProduct(req, res, next) {
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
  next(error)
  }
}

async function editProduct(req, res, next) {
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
  next(error)
  }
}

async function deleteProduct(req, res, next) {
  try {
    await productService.deleteProduct(req.params.id);
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
 next(error)
  }
}


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
  getLatestProducts,
  updateProductStatus
};
