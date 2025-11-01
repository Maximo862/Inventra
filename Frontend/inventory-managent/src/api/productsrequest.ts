import { Product } from "../types/types";
const URL = "http://localhost:4000";

export async function getAllProductsRequest() {
  const res = await fetch(`${URL}/products?active=true`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("GetAllProducts Error");
  return res.json();
}

export async function getInactiveProductsRequest() {
  const res = await fetch(`${URL}/products?active=false`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("GetInactiveProducts Error");
  return res.json();
}

export async function updateProductStatusRequest(id: number, isActive: boolean) {
  const res = await fetch(`${URL}/products/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive }),
  });

  if (!res.ok) throw new Error("UpdateProductStatus Error");
  return res.json();
}

export async function getLatestProductsRequest() {
  const res = await fetch(`${URL}/latestproducts`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("GetLatestProducts Error");
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

   const data = await res.json()

  if (!res.ok)  throw new Error(data.error || "DeleteCategory Error")
  return data;
}
