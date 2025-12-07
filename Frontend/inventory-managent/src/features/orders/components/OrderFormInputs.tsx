import { Order, Product } from "../../types/types";

interface OrderFormInputsProps {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  products: Product[];
}

export function OrderFormInputs({
  order,
  setOrder,
  products,
}: OrderFormInputsProps) {
  return (
    <div className="space-y-4">
      {/* Tipo de Orden */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Orden *
        </label>
        <select
          value={order.type}
          onChange={(e) =>
            setOrder({
              ...order,
              type: e.target.value as "entrada" | "salida",
            })
          }
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        >
          <option value="entrada">Entrada (Agregar Stock)</option>
          <option value="salida">Salida (Reducir Stock)</option>
        </select>
      </div>

      {/* Producto y Cantidad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Producto *
          </label>
          <select
            value={order.product_id || 0}
            onChange={(e) =>
              setOrder({ ...order, product_id: Number(e.target.value) })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          >
            <option value={0}>Seleccionar producto</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Stock actual: {p.stock})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad *
          </label>
          <input
            type="number"
            value={order.quantity || ""}
            onChange={(e) =>
              setOrder({ ...order, quantity: Number(e.target.value) })
            }
            placeholder="Ej: 10"
            min="1"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
      </div>
    </div>
  );
}