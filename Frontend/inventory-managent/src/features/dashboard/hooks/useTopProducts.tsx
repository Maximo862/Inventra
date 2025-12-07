import { useMemo } from "react";
import { Product } from "../types/types";
import { Order } from "../types/types";

interface UseTopProductsProps {
  products: Product[];
  orders: Order[]; 
}

interface TopProduct {
  id: number;
  name: string;
  totalSold: number;
  revenue: number;
  category?: string;
}

export function useTopProducts({ products, orders }: UseTopProductsProps) {
  
  const topProducts = useMemo(() => {
    const salesMap = new Map<number, { quantity: number; revenue: number }>();

    orders
      .filter((order) => order.type === "salida")
      .forEach((order) => {
        const current = salesMap.get(order.product_id!) || {
          quantity: 0,
          revenue: 0,
        };
        
        const product = products.find((p) => p.id === order.product_id);
        const orderRevenue = product ? product.price * order.quantity : 0;

        salesMap.set(order.product_id!, {
          quantity: current.quantity + order.quantity,
          revenue: current.revenue + orderRevenue,
        });
      });

    const sortedProducts: TopProduct[] = Array.from(salesMap.entries())
      .map(([productId, sales]) => {
        const product = products.find((p) => p.id === productId);
        return {
          id: productId,
          name: product?.name || "Producto desconocido",
          totalSold: sales.quantity,
          revenue: sales.revenue,
          category: product?.category_id?.toString(),
        };
      })
      .sort((a, b) => b.totalSold - a.totalSold);

    return sortedProducts;
  }, [products, orders]);

  const top3Products = useMemo(() => {
    return topProducts.slice(0, 3);
  }, [topProducts]);

  const top5Products = useMemo(() => {
    return topProducts.slice(0, 5);
  }, [topProducts]);

  const top10Products = useMemo(() => {
    return topProducts.slice(0, 10);
  }, [topProducts]);

  return {
    topProducts, 
    top3Products,
    top5Products,
    top10Products,
    hasTopProducts: topProducts.length > 0,
  };
}