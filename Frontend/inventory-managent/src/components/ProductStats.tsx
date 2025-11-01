import { Product } from "../types/types";

interface ProductStatsProps {
  products: Product[];
}

export function ProductStats({ products }: ProductStatsProps) {
  const totalStock = products.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);
  const lowStockCount = products.filter(
    (p) => p.alert_threshold && p.stock <= p.alert_threshold
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-blue-600 font-medium">Total Productos</p>
        <p className="text-2xl font-bold text-blue-900">{products.length}</p>
      </div>
      
      <div className="bg-green-50 rounded-lg p-4">
        <p className="text-sm text-green-600 font-medium">Stock Total</p>
        <p className="text-2xl font-bold text-green-900">{totalStock}</p>
      </div>
      
      <div className="bg-orange-50 rounded-lg p-4">
        <p className="text-sm text-orange-600 font-medium">Bajo Stock</p>
        <p className="text-2xl font-bold text-orange-900">{lowStockCount}</p>
      </div>
    </div>
  );
}