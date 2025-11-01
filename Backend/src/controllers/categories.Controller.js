const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../services/categories.Service");

async function createCategoryCtrl(req, res) {
  try {
    const category = await createCategory(req.body);
    res.status(201).json({
      message: "Category created",
      category,
    });
  } catch (err) {
    console.error("Error creating category:", err.message);
    const status = err.message === "Missing fields" ? 400 : 500;
    res.status(status).json({ error: err.message });
  }
}

async function getAllCategoriesCtrl(req, res) {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateCategoryCtrl(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await updateCategory({ id, name });
    res.status(200).json({ message: "Category updated", category });
  } catch (err) {
    console.error("Error updating category:", err.message);
    const status = err.message.includes("not found") ? 404 : 500;
    res.status(status).json({ error: err.message });
  }
}

async function deleteCategoryCtrl(req, res) {
  try {
    const { id } = req.params;

    const deleted = await deleteCategory(id);
    res.status(200).json({ message: "Category deleted", deleted });
  } catch (err) {
    console.error("Error deleting category:", err.message);
    console.error("Error deleting category2:", err);
    const status =
      err.message.includes("not found") || err.message.includes("use")
        ? 400
        : 500;
    return res.status(status).json({ error: err.message });
  }
}

module.exports = {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
};
