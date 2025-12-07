import { createContext, useEffect, useState } from "react";
import {
  getAllCategoriesRequest,
  createCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
} from "../api/categoriesRequest";
import { Category } from "../../../types/types";
import toast from "react-hot-toast";
import { handleError } from "@/utils/errorHandler";

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
      toast.success("Categoria creado exitosamente");
    } catch (error) {
      handleError(error, "crear");
      console.error("Error creating category:", error);
      throw error;
    }
  }

  async function editCategory(category: Category, id: number) {
    try {
      await updateCategoryRequest(category, id);
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...category } : c))
      );
      toast.success("Categoria editada exitosamente");
    } catch (error) {
      console.error("Error editing category:", error);
      handleError(error, "editar");
      throw error;
    }
  }

  async function deleteCategory(id: number) {
    try {
      await deleteCategoryRequest(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("Categoria borrada exitosamente");
    } catch (error: any) {
      console.log("error del delete ", error);
      handleError(error, "borrar");
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
