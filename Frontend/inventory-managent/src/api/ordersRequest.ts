import { Order } from "../types/types";

const URL = "http://localhost:4000";

export async function getAllOrdersRequest() {
  const res = await fetch(`${URL}/orders`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("GetAllOrders Error");
  return res.json();
}

export async function getLatestOrdersRequest() {
  const res = await fetch(`${URL}/latestorders`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("GetLatestOrders Error");
  return res.json();
}

export async function getOrderByIdRequest(id: number) {
  const res = await fetch(`${URL}/orders/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("GetOrderById Error");
  return res.json();
}

export async function createOrderRequest(order: Order) {
  const res = await fetch(`${URL}/orders`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!res.ok) throw new Error("CreateOrder Error");
  return res.json();
}

export async function updateOrderRequest(order: Order, id: number) {
  const res = await fetch(`${URL}/orders/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!res.ok) throw new Error("UpdateOrder Error");
  return res.json();
}

export async function deleteOrderRequest(id: number) {
  const res = await fetch(`${URL}/orders/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("DeleteOrder Error");
  return res.json();
}
