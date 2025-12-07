import { FiPackage, FiTrendingUp, FiDollarSign, FiActivity } from "react-icons/fi";

interface DashboardStatsProps {
  totalProducts: number;
  totalStock: number;
  alerts: number;
  expiringSoonCount: number;
  isLowerStock: number;
  isExpired: number;
  avgStock: number;
  currentMonthProfit: number;
  totalProfit: number;
}

export function DashboardStats({
  totalProducts,
  totalStock,
  alerts,
  expiringSoonCount,
  isLowerStock,
  isExpired,
  avgStock,
  currentMonthProfit,
  totalProfit,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <FiPackage className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">Total Productos</h3>
        <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
        <p className="text-sm text-gray-600 mt-2">Stock total: {totalStock}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <FiTrendingUp className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">Alertas</h3>
        <p className="text-3xl font-bold text-orange-600">{alerts}</p>
        {isExpired > 0 && (
        <p className="text-sm text-yellow-600">{isExpired} expirados</p>
        )}
        {expiringSoonCount > 0 && (
          <p className="text-sm text-yellow-600">{expiringSoonCount} expiran pronto</p>
        )}
        {isLowerStock > 0 && (
        <p className="text-sm text-yellow-600">{isLowerStock} bajo stock</p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <FiDollarSign className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">Ganancia Mensual</h3>
        <p className="text-3xl font-bold text-green-600">
          ${currentMonthProfit.toLocaleString('es-AR')}
        </p>
        <p className="text-sm text-gray-600 mt-2">Mes actual</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <FiActivity className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">Ganancia Total</h3>
        <p className="text-3xl font-bold text-purple-600">
          ${totalProfit.toLocaleString('es-AR')}
        </p>
        <p className="text-sm text-gray-600 mt-2">Promedio stock: {avgStock.toFixed(2)}</p>
      </div>
    </div>
  );
}