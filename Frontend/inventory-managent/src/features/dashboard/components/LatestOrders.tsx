import { Order } from "@/types/types";

interface LatestOrdersProps {
  orders: Order[];
}

export function LatestOrders({ orders }: LatestOrdersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Últimas Órdenes
      </h3>
      
      {orders.length > 0 ? (
        <ul className="space-y-2">
          {orders.map((o) => (
            <li key={o.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    o.type === "entrada" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span className="text-gray-700 capitalize">{o.type}</span>
              </div>
              <span className="text-sm text-gray-500">
                Cantidad: {o.quantity}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay órdenes aún...</p>
      )}
    </div>
  );
}