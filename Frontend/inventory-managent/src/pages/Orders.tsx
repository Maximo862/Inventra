import { useContext, useState, FormEvent } from "react";
import { OrderContext } from "../context/OrdersContext";
import { Order } from "../types/types";
import { ProductContext } from "../context/ProductsContext";

export function Orders() {
  const { orders, createOrder, editOrder, deleteOrder } =
    useContext(OrderContext)!;
  const { products } = useContext(ProductContext)!;

  const [order, setOrder] = useState<Order>({
    type: "entrada",
    quantity: 0,
    product_id: 0,
  });

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  function resetForm() {
    setOrder({
      type: "entrada",
      quantity: 0,
      product_id: 0,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!order.quantity || !order.product_id) return;

    if (editingId) {
      await editOrder(order, editingId);
      setEditingId(null);
    } else {
      await createOrder(order);
      setIsCreating(false);
    }

    resetForm();
  }

  return (
    <section>
      {isCreating ? (
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsCreating(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <button onClick={() => setIsCreating(true)}>+ Create Order</button>
      )}

      <div>
        {orders &&
          orders?.map((o) =>
            editingId === o.id ? (
              <form key={o.id} onSubmit={handleSubmit}>
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
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
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
