import { Supplier } from "../types/types";
const URL = "http://localhost:4000";

export async function getAllSuppliersRequest() {
  const res = await fetch(`${URL}/suppliers`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("GetAllSuppliers Error");
  return res.json();
}

export async function getSupplierByIdRequest(id: number) {
  const res = await fetch(`${URL}/suppliers/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("GetSupplier Error");
  return res.json();
}

export async function createsuppliersRequest(supplier: Supplier) {
  const res = await fetch(`${URL}/suppliers`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(supplier),
  });

  if (!res.ok) throw new Error("CreateSupplier Error");
  return res.json();
}

export async function editsuppliersRequest(supplier: Supplier, id: number) {
  const res = await fetch(`${URL}/suppliers/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(supplier),
  });

  if (!res.ok) throw new Error("EditSupplier Error");
  return res.json();
}

export async function deleteSuppliersRequest(id: number) {
  const res = await fetch(`${URL}/suppliers/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("DeleteSupplier Error");
  return res.json();
}
