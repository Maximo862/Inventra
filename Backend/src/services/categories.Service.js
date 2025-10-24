const {
  createCategoryDB,
  getAllCategoriesDB,
  updateCategoryDB,
  deleteCategoryDB,
  categoryInUse,
} = require("../repositories/categories.Repository");

async function createCategory({ name }) {
  if (!name) throw new Error("Missing fields");

  const id = await createCategoryDB(name);
  return { id, name };
}

async function getAllCategories() {
  return await getAllCategoriesDB();
}

async function updateCategory({ id, name }) {
  const result = await updateCategoryDB(id, name);
  if (result.affectedRows === 0) throw new Error("Category not found");
  return { id, name };
}

async function deleteCategory(id) {
  const used = await categoryInUse(id);
  if (used) throw new Error("Category in use by products");

  const result = await deleteCategoryDB(id);
  if (result.affectedRows === 0) throw new Error("Category not found");

  return { id };
}

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
