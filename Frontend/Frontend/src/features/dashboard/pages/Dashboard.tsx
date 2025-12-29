import { useContext } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { usePricesAnalysis } from "../hooks/usePricesAnalysis";
import { useTopProducts } from "../hooks/useTopProducts";
import { DashboardStats } from "../components/DashboardStats";
import { ChartCard } from "../components/ChartCard";
import {
  FiBarChart2,
  FiTrendingUp,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi";
import { QuickActions } from "@/features/dashboard/components/QuickActions";
import { LatestProducts } from "@/features/dashboard/components/LatestProducts";
import { LatestOrders } from "@/features/dashboard/components/LatestOrders";
import { TopProductsCards } from "@/features/dashboard/components/TopProductsCard";
import { ProductContext } from "@/features/products/context/ProductsContext";
import { CategoryContext } from "@/features/categories/context/CategoriesContext";
import { OrderContext } from "@/features/orders/context/OrdersContext";
import { useProductsAlert } from "@/hooks/useProductsAlert";
import { FaPlus } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import { BsFillTelephonePlusFill } from "react-icons/bs";

export function Dashboard() {
  const { products, latestProducts } = useContext(ProductContext)!;
  const { categories } = useContext(CategoryContext)!;
  const { orders, latestOrders } = useContext(OrderContext)!;

  const { lowerStockProducts, expiringSoon, expired } = useProductsAlert();

  const alerts =
    lowerStockProducts.length + expiringSoon.length + expired.length;

  const stats = useDashboardStats({ products, orders, categories });

  const prices = usePricesAnalysis({
    entries: stats.entries,
    exits: stats.exits,
  });

  const { hasTopProducts, top10Products, top3Products } = useTopProducts({
    products,
    orders,
  });

  const ordersChartData = [
    { name: "Entradas", quantity: stats.totalEntries },
    { name: "Salidas", quantity: stats.totalExits },
  ];

  const pricesChartData = [
    { name: "Entradas", prices: prices.entriesPrices },
    { name: "Salidas", prices: prices.exitsPrices },
  ];

  const quickActions = [
    {
      to: "/products",
      label: "Crear Producto",
      icon: <FaPlus />,
      color: "bg-blue-600",
      hoverColor: "bg-blue-700",
    },
    {
      to: "/categories",
      label: "Crear Categoría",
      icon: <FaFileCirclePlus />,
      color: "bg-purple-600",
      hoverColor: "bg-purple-700",
    },
    {
      to: "/suppliers",
      label: "Nuevo Proveedor",
      icon: <BsFillTelephonePlusFill />,
      color: "bg-green-600",
      hoverColor: "bg-green-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Vista general de tu inventario</p>
        </div>

        <DashboardStats
          totalProducts={stats.totalProducts}
          totalStock={stats.totalStock}
          alerts={alerts}
          isExpired={expired.length}
          isLowerStock={lowerStockProducts.length}
          expiringSoonCount={expiringSoon.length}
          avgStock={stats.avgStock}
          currentMonthProfit={prices.currentMonthProfit}
          totalProfit={prices.totalProfit}
        />

        <QuickActions actions={quickActions} />

        {hasTopProducts && <TopProductsCards products={top3Products} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <LatestProducts products={latestProducts} />
          <LatestOrders orders={latestOrders} />
        </div>

        {hasTopProducts && (
          <ChartCard
            title="Top 10 Productos Más Vendidos"
            icon={<FiTrendingUp className="h-6 w-6 text-gray-700" />}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={top10Products}>
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                          <p className="font-bold text-gray-900">
                            {payload[0].payload.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Ventas: {payload[0].value} unidades
                          </p>
                          <p className="text-sm text-green-600 font-medium">
                            Ingresos: $
                            {payload[0].payload.revenue.toLocaleString("es-AR")}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="totalSold"
                  fill="#8B5CF6"
                  name="Unidades Vendidas"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        <ChartCard
          title="Stock por Categoría"
          icon={<FiBarChart2 className="h-6 w-6 text-gray-700" />}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.stockByCategory}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Entradas vs Salidas"
          icon={<FiTrendingUp className="h-6 w-6 text-gray-700" />}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Precios: Entradas vs Salidas"
          icon={<FiDollarSign className="h-6 w-6 text-gray-700" />}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pricesChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="prices" fill="#06B6D4" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Órdenes Mensuales"
          icon={<FiCalendar className="h-6 w-6 text-gray-700" />}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prices.dataByMonth}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="exits" fill="#10B981" name="Salidas" />
              <Bar dataKey="entries" fill="#EF4444" name="Entradas" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Análisis de Precios Mensual"
          icon={<FiDollarSign className="h-6 w-6 text-gray-700" />}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prices.dataByMonth}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pricesExits" fill="#10B981" name="Ingresos" />
              <Bar dataKey="pricesEntries" fill="#EF4444" name="Gastos" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
