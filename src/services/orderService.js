import { apiRequest } from "../api/client";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const ORDER_KEY = "chickncup_orders";

export async function getOrders() {
  await apiRequest("/orders");
  return loadFromStorage(ORDER_KEY, []);
}

export async function createOrder(payload) {
  await apiRequest("/orders", { method: "POST", body: payload });
  const orders = await getOrders();
  const nextOrders = [
    {
      ...payload,
      id: `CNC-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "Pending",
    },
    ...orders,
  ];
  saveToStorage(ORDER_KEY, nextOrders);
  return nextOrders;
}

export async function updateOrderStatus(orderId, status) {
  await apiRequest(`/admin/orders/${orderId}`, { method: "PATCH", body: { status } });
  const orders = await getOrders();
  const nextOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status } : order
  );
  saveToStorage(ORDER_KEY, nextOrders);
  return nextOrders;
}
