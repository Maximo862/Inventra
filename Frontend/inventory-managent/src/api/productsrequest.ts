import { Product } from "../types/types";
const URL = "http://localhost:4000";

export async function getAllProductsRequest() {
  try {
    const res = await fetch(`${URL}/products`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    return { error: error };
  }
}

export async function getProductByIdRequest(id: number) {
  try {
    const res = await fetch(`${URL}/products/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    return { error: error };
  }
}

export async function createProductRequest(product: Product) {
  try {
    const res = await fetch(`${URL}/products`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    return { error: error };
  }
}

export async function editProductRequest(product: Product, id: number) {
  try {
    const res = await fetch(`${URL}/products/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    return { error: error };
  }
}

export async function deleteProductRequest(id: number) {
  try {
    const res = await fetch(`${URL}/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return data;
  } catch (error) {
    return { error: error };
  }
}
