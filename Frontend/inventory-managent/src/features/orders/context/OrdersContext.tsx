import { createContext, useContext, useEffect, useState } from "react";
import {
  getAllOrdersRequest,
  createOrderRequest,
  updateOrderRequest,
  deleteOrderRequest,
  getLatestOrdersRequest,
} from "../api/ordersRequest";
import { Order } from "../../../types/types";
import { ProductContext } from "../../products/context/ProductsContext";
import toast from "react-hot-toast";
import { handleError } from "@/utils/errorHandler";

interface OrderContextType {
  orders: Order[];
  latestOrders: Order[];
  createOrder: (order: Order) => Promise<void>;
  editOrder: (order: Order, id: number) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: any) {
  const { getAllProducts } = useContext(ProductContext)!;
  const [orders, setOrders] = useState<Order[]>([]);
  const [latestOrders, setlatestOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await getAllOrdersRequest();
        setOrders(res);
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    }
    loadOrders();
  }, []);

  async function getLatestOrders() {
    try {
      const res = await getLatestOrdersRequest();
      setlatestOrders(res.orders);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLatestOrders();
  }, [orders]);

  async function createOrder(order: Order) {
    try {
      const res = await createOrderRequest(order);
      setOrders((prev) => [...prev, res.order]);
      await getAllProducts();
      toast.success("Orden creada exitosamente");
    } catch (error) {
      handleError(error, "crear");
      throw error;
    }
  }

  async function editOrder(order: Order, id: number) {
    try {
      await updateOrderRequest(order, id);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, ...order } : o))
      );
      await getAllProducts();
      toast.success("Orden actualizada exitosamente");
    } catch (error) {
      handleError(error, "actualizar");
      throw error;
    }
  }

  async function deleteOrder(id: number) {
    try {
      await deleteOrderRequest(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      await getAllProducts();
      toast.success("Orden eliminada exitosamente");
    } catch (error) {
      handleError(error, "eliminar");
      throw error;
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        editOrder,
        deleteOrder,
        latestOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
