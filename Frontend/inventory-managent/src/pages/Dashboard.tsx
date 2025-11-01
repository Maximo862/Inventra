import { useContext, useMemo } from "react";
import { ProductContext } from "../context/ProductsContext";
import dayjs from "dayjs";
import { CategoryContext } from "../context/CategoriesContext";
import { OrderContext } from "../context/OrdersContext";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useProductsAlert } from "../hooks/useProductsAlert";
import { Link } from "react-router-dom";

export function Dashboard() {
  const { products, latestProducts } = useContext(ProductContext)!;
  const { categories } = useContext(CategoryContext)!;
  const { orders, latestOrders} = useContext(OrderContext)!;
  const stocktotal = products.reduce(
    (acc, product) => acc + Number(product.stock),
    0
  );
  const { lowerStockProducts, expiringSoon } = useProductsAlert();

  const data = useMemo(() => {
    return categories.map((cat) => {
      const stockTotal = products
        .filter((p) => p.category_id === cat.id)
        .reduce((acc, p) => acc + Number(p.stock || 0), 0);

      return { name: cat.name, stock: stockTotal };
    });
  }, [categories, products]);

  const entries = orders.filter((o) => o.type === "entrada");
  const exits = orders.filter((o) => o.type === "salida");

  const dataprices = useMemo(() => {
    const entriesPrices = entries.reduce((acc, order) => {
  const product = products.find((p) => p.id === order.product_id);
  return acc + (product ? product.price * order.quantity : 0);
}, 0);

const exitsPrices = exits.reduce((acc, order) => {
  const product = products.find((p) => p.id === order.product_id);
  return acc + (product ? product.price * order.quantity : 0);
}, 0);

const avgStock = products.reduce((acc, p) => acc + Number(p.stock), 0) / products.length;
const avgPrices = exitsPrices - entriesPrices

    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const dataByMonth = months.map((month, index) => {
      const entriesCount = entries.filter(
        (o) => dayjs(o.created_at).month() === index
      );
      const exitsCount = exits.filter(
        (o) => dayjs(o.created_at).month() === index
      );

      const pricesEntries = entriesCount.reduce((acc, order) => {
        const product = products.find((p) => p.id === order.product_id);
        return acc + (product ? product.price * order.quantity : 0);
      }, 0);

      const pricesExits = exitsCount.reduce((acc, order) => {
        const product = products.find((p) => p.id === order.product_id);
        return acc + (product ? product.price * order.quantity : 0);
      }, 0);

      const averagePricesForMounth = pricesExits - pricesEntries;

      return {
        name: month,
        entries: entriesCount.length,
        exits: exitsCount.length,
        pricesEntries,
        pricesExits,
        averagePricesForMounth,
      };
    });
    return {
      entriesPrices,
      exitsPrices,
      months,
      dataByMonth,
      avgStock,
      avgPrices
    };
  }, [entries, exits]);

  const datapricesarray = [
    { name: "entries prices", prices: dataprices.entriesPrices },
    { name: "exits prices", prices: dataprices.exitsPrices },
  ];

  const dataorders = [
    { name: "Entradas", quantity: entries.length },
    { name: "Salidas", quantity: exits.length },
  ];

  return (
    <div>
      <h2>testing</h2>
      <h3>Total de productos: {products.length}</h3>
      <h3>Stock total: {stocktotal}</h3>
      <h3>Productos con bajo stock: {lowerStockProducts.length}</h3>
      <h3>Productos que expiran pronto: {expiringSoon.length}</h3>
      <h3>Promedio estimado de stock:  {isNaN(dataprices.avgStock) ? "No hay stock..." : dataprices.avgStock}</h3>
<h3>💵 Ganancia Mensual estimada: ${dataprices.dataByMonth[dayjs().month()].averagePricesForMounth}</h3>
<h3>Ganancia Total estimada: ${dataprices.avgPrices}</h3>
<h3>Ultimos productos creados :</h3>
{latestOrders.length > 0 ? (latestProducts.map((lp) => (
  <p>- {lp.name}</p>
))) : (<p>No hay productos aun...</p>)}
<h3>Ultimas ordenes creados :</h3>
{latestOrders.length > 0 ? ( latestOrders.map((lp) => (
  <p>- {lp.type}</p>
))) : (<p>No hay ordenes aun...</p>)}
<div className="d-flex gap-3 mt-3">
  <Link to="/products" className="btn btn-primary">➕ Crear Producto</Link>
  <Link to="/categories" className="btn btn-secondary">📂 Crear Categoría</Link>
  <Link to="/suppliers" className="btn btn-success">🏭 Nuevo Proveedor</Link>
</div>

      <div>
        <h2 className="mb-4">📊 Stock por categoría</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataorders}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datapricesarray}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="prices" fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataprices.dataByMonth}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="entries" fill="#4CAF50" />
          <Bar dataKey="exits" fill="#FF5722" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataprices.dataByMonth}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="pricesEntries" fill="#4CAF50" />
          <Bar dataKey="pricesExits" fill="#FF5722" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}
