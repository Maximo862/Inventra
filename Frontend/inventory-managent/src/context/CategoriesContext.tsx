import { createContext, useEffect, useState } from "react";
import {
  getAllCategoriesRequest,
  createCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
} from "../api/categoriesRequest";
import { Category } from "../types/types";

interface CategoryContextType {
  categories: Category[];
  createCategory: (category: Category) => Promise<void>;
  editCategory: (category: Category, id: number) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const CategoryContext = createContext<CategoryContextType | null>(null);

export function CategoryProvider({ children }: any) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await getAllCategoriesRequest();
        setCategories(res);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }
    loadCategories();
  }, []);

  async function createCategory(category: Category) {
    try {
      const res = await createCategoryRequest(category);
      setCategories((prev) => [...prev, res.category]);
      console.log("Category created:", res.category);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  }

  async function editCategory(category: Category, id: number) {
    try {
      const res = await updateCategoryRequest(category, id);
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...category } : c))
      );
      console.log("Category updated:", res);
    } catch (error) {
      console.error("Error editing category:", error);
    }
  }

  async function deleteCategory(id: number) {
    try {
      await deleteCategoryRequest(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      console.log("Category deleted:", id);
    } catch (error: any) {
      console.log("error del delete ", error)
      const msg = error.message || "";
    if (msg.includes("in use")) {
       alert("❌ No se puede eliminar esta categoria porque tiene órdenes asociadas.");
    } else {
      alert("⚠️ Error al eliminar la categoria.");
    }
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        createCategory,
        editCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
