import { createContext, useState, useEffect } from "react";
import {
  getAllSuppliersRequest,
  getSupplierByIdRequest,
  createsuppliersRequest,
  editsuppliersRequest,
  deleteSuppliersRequest,
} from "../api/supplierRequests";
import { Supplier } from "../../../types/types";
import toast from "react-hot-toast";
import { handleError } from "@/utils/errorHandler";

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
      setSuppliers((prev) => [...prev, res.supplier]);
      toast.success("Proveedor creado exitosamente");
    } catch (error) {
      handleError(error, "crear");
      throw error;
    }
  }

  async function editSupplier(supplier: Supplier, id: number) {
    try {
      const res = await editsuppliersRequest(supplier, id);
      setSuppliers((prev) => prev.map((s) => (s.id === id ? res.supplier : s)));
      toast.success("Proveedor actualizado exitosamente");
    } catch (error) {
      handleError(error, "actualizar");
      throw error;
    }
  }

  async function deleteSupplier(id: number) {
    try {
     await deleteSuppliersRequest(id);
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
      toast.success("Proveedor eliminado exitosamente");
    } catch (error) {
      handleError(error, "eliminar");
      throw error;
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
