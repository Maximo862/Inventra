import { useContext, useState } from "react";
import { OrderContext } from "../context/OrdersContext";
import { Order } from "../types/types";
import { ProductContext } from "../context/ProductsContext";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { useFormHandler } from "../hooks/useFormHandler";
import { FormCard } from "../components/FormCard";
import { ProductCard } from "../components/ProductCard";

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
            setIsCreating(false);
            setEditingId(null);
            resetForm();
          }}
          submitText="Guardar"
        />
      ) : (
        <button onClick={() => setIsCreating(true)}>+ Create Order</button>
      )}
        {orders &&
          orders?.map((o) => (
<ProductCard
key={o.id}
name={products.find((p) => p.id === o.product_id)?.name!}
features={
  <div>
  <p>{o.type.toUpperCase()}</p>
  <p>Cantidad: {o.quantity}</p>
</div>
}
onDelete={() => deleteOrder(o.id!)}
onEdit={async () => {
              setEditingId(o.id!);
              setOrder({
                product_id:  o.product_id,
                quantity: o.quantity, 
                type: o.type 
              });
            }}
            disabled={isCreating || !!editingId}
            type="order"
/>
          ))}
    </section>
  );
}
