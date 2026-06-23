import { apiRequest, getAuthToken, isApiConfigured } from "../api/client";
import { resolveMenuImage } from "../utils/menuImages";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const ORDER_KEY = "chickncup_orders";

function normalizeOrder(order) {
  return {
    id: order._id || order.id,
    orderNumber: order.orderNumber || order.id,
    userId: order.userId || order.user || order.user?._id,
    customerName: order.customerName,
    contactNumber: order.contactNumber,
    address: order.address,
    fulfillmentMethod: order.fulfillmentMethod,
    paymentMethod: order.paymentMethod,
    notes: order.notes,
    status: order.status,
    createdAt: order.createdAt,
    subtotal: order.subtotal ?? order.total,
    deliveryFee: order.deliveryFee ?? 0,
    total: order.total,
    statusHistory: order.statusHistory || [],
    items: (order.items || []).map((item) => ({
      id: item.menuItemId || item.id,
      code: item.code,
      name: item.name,
      image: resolveMenuImage(item.code, item.imageUrl || item.image),
      price: item.priceAtOrderTime ?? item.price,
      quantity: item.quantity,
    })),
  };
}

export async function getOrders() {
  if (isApiConfigured()) {
    if (!getAuthToken()) {
      return [];
    }

    try {
      const orders = await apiRequest("/orders");
      return orders.map(normalizeOrder);
    } catch (error) {
      if (
        error.message === "Authentication required." ||
        error.message === "Invalid or expired token."
      ) {
        return [];
      }

      throw error;
    }
  }

  return loadFromStorage(ORDER_KEY, []);
}

export async function createOrder(payload) {
  if (isApiConfigured()) {
    const order = await apiRequest("/orders", {
      method: "POST",
      body: {
        ...payload,
        items: payload.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      },
    });
    return normalizeOrder(order);
  }

  const nextOrder = {
    ...payload,
    id: `CNC-${Date.now()}`,
    orderNumber: `CNC-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "Pending",
  };
  const orders = await getOrders();
  saveToStorage(ORDER_KEY, [nextOrder, ...orders]);
  return nextOrder;
}

export async function updateOrderStatus(orderId, status) {
  if (isApiConfigured()) {
    const order = await apiRequest(`/admin/orders/${orderId}/status`, {
      method: "PATCH",
      body: { status },
    });
    return normalizeOrder(order);
  }

  const orders = await getOrders();
  const nextOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status } : order
  );
  saveToStorage(ORDER_KEY, nextOrders);
  return nextOrders.find((order) => order.id === orderId);
}
