import { createContext, useEffect, useState } from "react";
import {
  getAllOrdersRequest,
  createOrderRequest,
  updateOrderRequest,
  deleteOrderRequest,
} from "../api/ordersRequest";
import { Order } from "../types/types";

interface OrderContextType {
  orders: Order[];
  createOrder: (order: Order) => Promise<void>;
  editOrder: (order: Order, id: number) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: any) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await getAllOrdersRequest();
        setOrders(res);
        console.log("orders:", res);
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    }
    loadOrders();
  }, []);

  async function createOrder(order: Order) {
    try {
      const res = await createOrderRequest(order);
      setOrders((prev) => [...prev, res.order]);
      console.log("Order created:", res.order);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }

  async function editOrder(order: Order, id: number) {
    try {
      const res = await updateOrderRequest(order, id);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, ...order } : o))
      );
      console.log("Order updated:", res);
    } catch (error) {
      console.error("Error editing order:", error);
    }
  }

  async function deleteOrder(id: number) {
    try {
      await deleteOrderRequest(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      console.log("Order deleted:", id);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        editOrder,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
