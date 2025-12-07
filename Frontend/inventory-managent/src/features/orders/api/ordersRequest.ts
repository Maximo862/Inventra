import { Order } from "@/types/types";
import { fetchAPI } from "@/utils/fetchHelper";


export const getAllOrdersRequest = () =>
  fetchAPI("/orders");

export const getLatestOrdersRequest = () =>
  fetchAPI("/latestorders");

export const getOrderByIdRequest = (id: number) =>
  fetchAPI(`/orders/${id}`);

export const createOrderRequest = (order: Order) =>
  fetchAPI("/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });

export const updateOrderRequest = (order: Order, id: number) =>
  fetchAPI(`/orders/${id}`, {
    method: "PUT",
    body: JSON.stringify(order),
  });

export const deleteOrderRequest = (id: number) =>
  fetchAPI(`/orders/${id}`, { method: "DELETE" });