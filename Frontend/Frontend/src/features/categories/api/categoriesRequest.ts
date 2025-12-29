import { Category } from "@/types/types";
import { fetchAPI } from "@/utils/fetchHelper";


export const getAllCategoriesRequest = () =>
  fetchAPI("/categories");

export const createCategoryRequest = (category: Category) =>
  fetchAPI("/categories", {
    method: "POST",
    body: JSON.stringify(category),
  });

export const updateCategoryRequest = (category: Category, id: number) =>
  fetchAPI(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(category),
  });

export const deleteCategoryRequest = (id: number) =>
  fetchAPI(`/categories/${id}`, { method: "DELETE" });