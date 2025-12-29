import { createContext, useState, useEffect } from "react";
import {
  createProductRequest,
  deleteProductRequest,
  editProductRequest,
  getAllProductsRequest,
  getProductByIdRequest,
  getLatestProductsRequest,
  getInactiveProductsRequest,
  updateProductStatusRequest,
} from "../api/productsrequest";
import { Product } from "../../../types/types";
import toast from "react-hot-toast";
import { handleError } from "@/utils/errorHandler";

interface ProductContextType {
  products: Product[];
  getProductById: (id: number) => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  editProduct: (product: Product, id: number) => Promise<void>;
  updateProductStatus: (id: number, isActive: boolean) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  getAllProducts: () => Promise<{ products: Product[] } | void>;
  latestProducts: Product[];
  inactiveProducts: Product[];
}

export const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: any) {
  const [products, setProducts] = useState<Product[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [inactiveProducts, setInactiveProducts] = useState<Product[]>([]);

  async function getAllProducts() {
    try {
      const res = await getAllProductsRequest();
      setProducts(res.products);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  async function getInactiveProducts() {
    try {
      const res = await getInactiveProductsRequest();
      setInactiveProducts(res.products);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateProductStatus(id: number, isActive: boolean) {
    try {
      await updateProductStatusRequest(id, isActive);
      await getAllProducts();
      await getInactiveProducts();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllProducts();
    getInactiveProducts();
  }, []);

  async function getProductById(id: number) {
    try {
    await getProductByIdRequest(id);
    } catch (error) {
      console.error(error);
    }
  }

  async function getLatestProducts() {
    try {
      const res = await getLatestProductsRequest();
      setLatestProducts(res.products);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLatestProducts();
  }, [products]);

  async function createProduct(product: Product) {
    try {
      await createProductRequest(product);
      const res = await getAllProducts();
      setProducts(res.products);
      toast.success("Producto creado exitosamente");
    } catch (error: any) {
      console.error(error);
      handleError(error, "crear");
      throw error;
    }
  }

  async function editProduct(product: Product, id: number) {
    try {
      await editProductRequest(product, id);
      const res = await getAllProducts();
      setProducts(res.products);
      toast.success("Producto editado exitosamente");
    } catch (error) {
      console.error(error);
      handleError(error, "editar");
      throw error;
    }
  }

  async function deleteProduct(id: number) {
    try {
      await deleteProductRequest(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Producto borrado exitosamente");
    } catch (error: any) {
      handleError(error, "borrar");
      throw error;
    }
  }

  return (
    <ProductContext.Provider
      value={{
        getProductById,
        createProduct,
        editProduct,
        deleteProduct,
        products,
        getAllProducts,
        latestProducts,
        updateProductStatus,
        inactiveProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
