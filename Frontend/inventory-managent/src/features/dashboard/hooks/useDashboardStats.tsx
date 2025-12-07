import { useMemo } from "react";
import { Product, Order, Category } from "../../../types/types";

interface UseDashboardStatsParams {
  products: Product[];
  orders: Order[];
  categories: Category[];
}

export function useDashboardStats({
  products,
  orders,
  categories,
}: UseDashboardStatsParams) {
  const totalStock = useMemo(
    () => products.reduce((acc, p) => acc + Number(p.stock), 0),
    [products]
  );

  const avgStock = useMemo(
    () => (products.length > 0 ? totalStock / products.length : 0),
    [products.length, totalStock]
  );

  const entries = useMemo(
    () => orders.filter((o) => o.type === "entrada"),
    [orders]
  );

  const exits = useMemo(
    () => orders.filter((o) => o.type === "salida"),
    [orders]
  );

  const stockByCategory = useMemo(() => {
    return categories.map((cat) => {
      const stockTotal = products
        .filter((p) => p.category_id === cat.id)
        .reduce((acc, p) => acc + Number(p.stock || 0), 0);

      return { name: cat.name, stock: stockTotal };
    });
  }, [categories, products]);

  return {
    totalStock,
    avgStock,
    totalProducts: products.length,
    totalOrders: orders.length,
    totalEntries: entries.length,
    totalExits: exits.length,
    entries,
    exits,
    stockByCategory,
  };
}
