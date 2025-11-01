import { Category } from "../types/types";
const URL = "http://localhost:4000";

export async function getAllCategoriesRequest() {
  const res = await fetch(`${URL}/categories`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("GetAllCategories Error");
  return res.json();
}

export async function createCategoryRequest(category: Category) {
  const res = await fetch(`${URL}/categories`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });

  if (!res.ok) throw new Error("CreateCategory Error");
  return res.json();
}

export async function updateCategoryRequest(category: Category, id: number) {
  const res = await fetch(`${URL}/categories/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });

  if (!res.ok) throw new Error("UpdateCategory Error");
  return res.json();
}

export async function deleteCategoryRequest(id: number) {
  const res = await fetch(`${URL}/categories/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json()

  if (!res.ok)  throw new Error(data.error || "DeleteCategory Error")
  return data;
}
