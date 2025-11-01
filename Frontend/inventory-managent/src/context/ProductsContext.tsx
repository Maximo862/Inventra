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
import { Product } from "../types/types";

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
      console.log("productscontext", res.products);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

   async function getInactiveProducts() {
    try {
      const res = await getInactiveProductsRequest();
      setInactiveProducts(res.products);
      console.log(res)
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
    getInactiveProducts()
  }, []);

  async function getProductById(id: number) {
    try {
      const res = await getProductByIdRequest(id);
      console.log(res);
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
    } catch (error) {
      console.error(error);
    }
  }

  async function editProduct(product: Product, id: number) {
    try {
      await editProductRequest(product, id);
      const res = await getAllProducts();
      setProducts(res.products);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteProduct(id: number) {
    try {
      const res = await deleteProductRequest(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      console.log(res);
    } catch (error: any) {
      console.error(error);
      const msg = error.message || "";
      if (msg.includes("FOREIGN KEY")) {
          alert("❌ No se puede eliminar este producto porque tiene órdenes asociadas.");
      } else {
        alert("⚠️ Error al eliminar el producto.");
      }
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
        inactiveProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
