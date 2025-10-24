import { useContext, useState } from "react";
import { OrderContext } from "../context/OrdersContext";
import { Order } from "../types/types";
import { ProductContext } from "../context/ProductsContext";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { useFormHandler } from "../hooks/useFormHandler";
import { FormCard } from "../components/FormCard";

export function Orders() {
  const { orders, createOrder, editOrder, deleteOrder } =
    useContext(OrderContext)!;
  const { products } = useContext(ProductContext)!;

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    formData: order,
    setFormData: setOrder,
    resetForm,
  } = useFormHandler<Order>({ type: "entrada", quantity: 0, product_id: 0 });

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

  return (
    <section>
      {isCreating || editingId ? (
        <FormCard
          handleSubmit={handleSubmit}
          inputs={
            <div>
              <select
                value={order.type}
                onChange={(e) =>
                  setOrder({
                    ...order,
                    type: e.target.value as "entrada" | "salida",
                  })
                }
              >
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
              </select>

              <input
                type="number"
                value={order.quantity || ""}
                onChange={(e) =>
                  setOrder({ ...order, quantity: Number(e.target.value) })
                }
                placeholder="Quantity"
              />

              <select
                onChange={(e) =>
                  setOrder({ ...order, product_id: Number(e.target.value) })
                }
              >
                <option value={0}>-- Select a Product --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          }
          onCancel={() => {
            setIsCreating(false)
         setEditingId(null)
         resetForm()
          }
          } 
          submitText="Guardar"
        />
      ) : (
        <button onClick={() => setIsCreating(true)}>+ Create Order</button>
      )}

      <div>
        {orders &&
          orders?.map((o) =>
            (
              <div key={o.id}>
                <h4>
                  {o.type.toUpperCase()} - Quantity: {o.quantity} - Product ID:{" "}
                  {o.product_id}
                </h4>
                <button onClick={() => deleteOrder(o.id!)}>Delete</button>
                <button
                  onClick={() => {
                    setEditingId(o.id!);
                    setOrder(o);
                  }}
                >
                  Edit
                </button>
              </div>
            )
          )}
      </div>
    </section>
  );
}
