import { Product } from "@/types/types";
import { fetchAPI } from "@/utils/fetchHelper";


export const getAllProductsRequest = () =>
  fetchAPI("/products?active=true");

export const getInactiveProductsRequest = () =>
  fetchAPI("/products?active=false");

export const updateProductStatusRequest = (id: number, isActive: boolean) =>
  fetchAPI(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
  });

export const getLatestProductsRequest = () =>
  fetchAPI("/latestproducts");

export const getProductByIdRequest = (id: number) =>
  fetchAPI(`/products/${id}`);

export const createProductRequest = (product: Product) =>
  fetchAPI("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });

export const editProductRequest = (product: Product, id: number) =>
  fetchAPI(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });

export const deleteProductRequest = (id: number) =>
  fetchAPI(`/products/${id}`, { method: "DELETE" });