import { createContext, useState, useEffect } from "react";
import {
  createProductRequest,
  deleteProductRequest,
  editProductRequest,
  getAllProductsRequest,
  getProductByIdRequest,
} from "../api/productsrequest";
import { Product } from "../types/types";

interface ProductContextType {
  products: Product[];
  getProductById: (id: number) => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  editProduct: (product: Product, id: number) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: any ) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const res = await getAllProductsRequest();
        setProducts(res.products);
        console.log("productscontext", res.products);
      } catch (error) {
        console.error(error);
      }
    }
    getAllProducts();
  }, []);

  async function getProductById(id: number) {
    try {
      const res = await getProductByIdRequest(id);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  async function createProduct(product:Product) {
    try {
      const res = await createProductRequest(product);
      console.log(res);
      setProducts((prev) => [...prev, res.product]);
    } catch (error) {
      console.error(error);
    }
  }

  async function editProduct(product:Product, id: number) {
    try {
      const res = await editProductRequest(product, id);
      setProducts((prev) => prev.map((p) => (p.id === id ? res.product : p)));
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
    } catch (error) {
      console.error(error);
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
