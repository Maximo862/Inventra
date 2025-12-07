const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../services/categories.Service");

async function createCategoryCtrl(req, res, next) {
  try {
    const category = await createCategory(req.body);
    res.status(201).json({
      message: "Category created",
      category,
    });
  } catch (err) {
    next(err)
  }
}

async function getAllCategoriesCtrl(req, res, next) {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
  next(err)
  }
}

async function updateCategoryCtrl(req, res, next) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await updateCategory({ id, name });
    res.status(200).json({ message: "Category updated", category });
  } catch (err) {
   next(err)
  }
}

async function deleteCategoryCtrl(req, res, next) {
  try {
    const { id } = req.params;

    const deleted = await deleteCategory(id);
    res.status(200).json({ message: "Category deleted", deleted });
  } catch (err) {
next(err)
  }
}

module.exports = {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
};
