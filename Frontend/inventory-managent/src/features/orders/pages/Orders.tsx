import { useContext, useState } from "react";
import { OrderContext } from "../context/OrdersContext";
import { TypeFilters } from "../components/TypeFilters";
import {
  FiShoppingCart,
  FiArrowDownCircle,
  FiArrowUpCircle,
} from "react-icons/fi";
import { PageHeader } from "@/components/PageHeader";
import { ProductContext } from "@/features/products/context/ProductsContext";
import { Order } from "@/types/types";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { StatsGrid } from "@/components/StatsGrid";
import { FormCard } from "@/components/cards/FormCard";
import { OrderFormInputs } from "../components/OrderFormInputs";
import { ProductCard } from "@/components/cards/ProductCard";

export function Orders() {
  const { orders, createOrder, editOrder, deleteOrder } =
    useContext(OrderContext)!;
  const { products } = useContext(ProductContext)!;

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "entrada" | "salida">(
    "all"
  );

  const {
    formData: order,
    setFormData: setOrder,
    resetForm,
  } = useFormHandler<Order>({
    type: "entrada",
    quantity: 0,
    product_id: 0,
    total: 0,
  });

  const { handleSubmit } = useFormSubmit<Order>({
    values: order,
    validate: (o) => !!o.quantity && !!o.type.trim() && !!o.product_id,
    editingId,
    setEditingId,
    editCategory: editOrder,
    createCategory: createOrder,
    setIsCreating,
    resetForm,
  });

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    resetForm();
  };

  // Filtrar órdenes por búsqueda y tipo
  const filteredOrders =
    orders?.filter((o) => {
      const product = products.find((p) => p.id === o.product_id);
      const matchesSearch = product?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || o.type === filterType;
      return matchesSearch && matchesType;
    }) || [];

  // Calcular estadísticas
  const totalEntradas =
    orders
      ?.filter((o) => o.type === "entrada")
      .reduce((sum, o) => sum + o.quantity, 0) || 0;

  const totalSalidas =
    orders
      ?.filter((o) => o.type === "salida")
      .reduce((sum, o) => sum + o.quantity, 0) || 0;

  // Configurar stats para StatsGrid
  const statsData = [
    {
      label: "Total Órdenes",
      value: filteredOrders.length,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      boldColor: "text-blue-900",
    },
    {
      label: "Total Entradas",
      value: totalEntradas,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      boldColor: "text-green-900",
      icon: <FiArrowDownCircle className="h-4 w-4" />,
    },
    {
      label: "Total Salidas",
      value: totalSalidas,
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      boldColor: "text-red-900",
      icon: <FiArrowUpCircle className="h-4 w-4" />,
    },
  ];

  // Configurar filtros para TypeFilters
  const filterOptions = [
    {
      value: "all" as const,
      label: "Todas",
      activeColor: "bg-blue-600 text-white",
      inactiveColor: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
    {
      value: "entrada" as const,
      label: "Entradas",
      icon: <FiArrowDownCircle className="h-4 w-4" />,
      activeColor: "bg-green-600 text-white",
      inactiveColor: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
    {
      value: "salida" as const,
      label: "Salidas",
      icon: <FiArrowUpCircle className="h-4 w-4" />,
      activeColor: "bg-red-600 text-white",
      inactiveColor: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Gestión de Órdenes"
          description="Administra las entradas y salidas de stock"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar órdenes por producto..."
          createButtonLabel="Crear Orden"
          onCreateClick={() => setIsCreating(true)}
          showCreateButton={!isCreating && !editingId}
        >
          {/* Filtros específicos de Orders */}
          <TypeFilters
            currentFilter={filterType}
            onFilterChange={setFilterType}
            options={filterOptions}
          />

          {/* Stats */}
          <div className="mt-4">
            <StatsGrid stats={statsData} />
          </div>
        </PageHeader>

        {/* Formulario con FormCard */}
        {(isCreating || editingId) && (
          <FormCard
            handleSubmit={handleSubmit}
            title={isCreating ? "Crear Nueva Orden" : "Editar Orden"}
            submitText={isCreating ? "Guardar" : "Actualizar"}
            onCancel={handleCancel}
            inputs={
              <OrderFormInputs
                order={order}
                setOrder={setOrder}
                products={products}
              />
            }
          />
        )}

        {/* Lista de órdenes */}
        {!isCreating && !editingId && (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FiShoppingCart className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">
                {filterType === "all"
                  ? "Todas las Órdenes"
                  : filterType === "entrada"
                  ? "Entradas de Stock"
                  : "Salidas de Stock"}
              </h2>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <FiShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No hay órdenes
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "No se encontraron órdenes con ese producto"
                    : "Comienza creando tu primera orden"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrders.map((o) => {
                  const product = products.find((p) => p.id === o.product_id);
                  return (
                    <ProductCard
                      key={o.id}
                      name={product?.name || "Producto no encontrado"}
                      features={
                        <div className="space-y-2">
                          <div
                            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                              o.type === "entrada"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {o.type === "entrada" ? (
                              <FiArrowDownCircle className="h-4 w-4" />
                            ) : (
                              <FiArrowUpCircle className="h-4 w-4" />
                            )}
                            <span>{o.type.toUpperCase()}</span>
                          </div>
                          <p>
                            <span className="font-medium">Cantidad:</span>{" "}
                            {o.quantity}
                          </p>
                          <p className="text-lg font-bold text-blue-600">
                            Total: ${o.total?.toLocaleString("es-AR")}
                          </p>
                          {o.created_at && (
                            <p className="text-xs text-gray-500">
                              {new Date(o.created_at).toLocaleDateString(
                                "es-AR",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          )}
                        </div>
                      }
                      onDelete={() => deleteOrder(o.id!)}
                      onEdit={async () => {
                        setEditingId(o.id!);
                        setOrder({
                          product_id: o.product_id,
                          quantity: o.quantity,
                          type: o.type,
                          total: o.total,
                        });
                      }}
                      disabled={isCreating || !!editingId}
                      type="order"
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
