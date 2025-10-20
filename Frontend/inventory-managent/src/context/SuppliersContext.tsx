import { createContext, useState, useEffect, useContext } from "react";
import {
  getAllSuppliersRequest,
  getSupplierByIdRequest,
  createsuppliersRequest,
  editsuppliersRequest,
  deleteSuppliersRequest,
} from "../api/supplierRequests";
import { Supplier } from "../types/types"; 

interface SupplierContextType {
  suppliers: Supplier[];
  getSupplierById: (id: number) => Promise<void>;
  createSupplier: (supplier: Supplier) => Promise<void>;
  editSupplier: (supplier: Supplier, id: number) => Promise<void>;
  deleteSupplier: (id: number) => Promise<void>;
}

export const SupplierContext = createContext<SupplierContextType | null>(null);

export function SupplierProvider({ children }: any) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    async function getAllSuppliers() {
      try {
        const res = await getAllSuppliersRequest();
        setSuppliers(res.suppliers || []);
        console.log("SuppliersContext:", res.suppliers);
      } catch (error) {
        console.error(error);
      }
    }
    getAllSuppliers();
  }, []);

  async function getSupplierById(id: number) {
    try {
      const res = await getSupplierByIdRequest(id);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  async function createSupplier(supplier: Supplier) {
    try {
      const res = await createsuppliersRequest(supplier);
      console.log("Nuevo proveedor creado:", res);
      setSuppliers((prev) => [...prev, res.supplier]);
    } catch (error) {
      console.error(error);
    }
  }

  async function editSupplier(supplier: Supplier, id: number) {
    try {
      const res = await editsuppliersRequest(supplier, id);
      setSuppliers((prev) =>
        prev.map((s) => (s.id === id ? res.supplier : s))
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteSupplier(id: number) {
    try {
      const res = await deleteSuppliersRequest(id);
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        getSupplierById,
        createSupplier,
        editSupplier,
        deleteSupplier,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
}