import { Product } from "../types/types";
const URL = "http://localhost:4000";

export async function getAllProductsRequest() {
  const res = await fetch(`${URL}/products`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("GetAllProducts Error");
  return res.json();
}

export async function getProductByIdRequest(id: number) {
  const res = await fetch(`${URL}/products/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("GetProduct Error");
  return res.json();
}

export async function createProductRequest(product: Product) {
  const res = await fetch(`${URL}/products`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("CreateProduct Error");
  return res.json();
}

export async function editProductRequest(product: Product, id: number) {
  const res = await fetch(`${URL}/products/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("EditProduct Error");
  return res.json();
}

export async function deleteProductRequest(id: number) {
  const res = await fetch(`${URL}/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("DeleteProduct Error");
  return res.json();
}
