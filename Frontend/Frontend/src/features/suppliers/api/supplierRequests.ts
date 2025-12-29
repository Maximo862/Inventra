import { Supplier } from "@/types/types";
import { fetchAPI } from "@/utils/fetchHelper";


export const getAllSuppliersRequest = () =>
  fetchAPI("/suppliers");

export const getSupplierByIdRequest = (id: number) =>
  fetchAPI(`/suppliers/${id}`);

export const createsuppliersRequest = (supplier: Supplier) =>
  fetchAPI("/suppliers", {
    method: "POST",
    body: JSON.stringify(supplier),
  });

export const editsuppliersRequest = (supplier: Supplier, id: number) =>
  fetchAPI(`/suppliers/${id}`, {
    method: "PUT",
    body: JSON.stringify(supplier),
  });

export const deleteSuppliersRequest = (id: number) =>
  fetchAPI(`/suppliers/${id}`, { method: "DELETE" });