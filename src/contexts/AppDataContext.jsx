import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createMenuItem,
  deleteMenuItem,
  getMenuItems,
  updateMenuItem,
} from "../services/menuService";
import { createOrder, getOrders, updateOrderStatus } from "../services/orderService";
import { useToast } from "./ToastContext";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const { addToast } = useToast();
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const hydrate = async () => {
    setLoading(true);
    setError("");
    try {
      const [menu, existingOrders] = await Promise.all([getMenuItems(), getOrders()]);
      setMenuItems(menu);
      setOrders(existingOrders);
    } catch (requestError) {
      setError("Unable to load Chick N' Cup data right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hydrate();
  }, []);

  const value = useMemo(
    () => ({
      menuItems,
      orders,
      loading,
      error,
      refreshData: hydrate,
      addMenuItem: async (payload) => {
        const createdItem = await createMenuItem(payload);
        setMenuItems((current) => [...current, createdItem]);
        addToast("Menu item added.", "success");
      },
      editMenuItem: async (itemId, payload) => {
        const updatedItem = await updateMenuItem(itemId, payload);
        setMenuItems((current) =>
          current.map((item) => (item.id === itemId ? updatedItem : item))
        );
        addToast("Menu item updated.", "success");
      },
      removeMenuItem: async (itemId) => {
        await deleteMenuItem(itemId);
        setMenuItems((current) => current.filter((item) => item.id !== itemId));
        addToast("Menu item deleted.", "success");
      },
      placeOrder: async (payload) => {
        const createdOrder = await createOrder(payload);
        setOrders((current) => [createdOrder, ...current]);
        addToast("Order placed successfully.", "success");
        return createdOrder;
      },
      changeOrderStatus: async (orderId, status) => {
        const updatedOrder = await updateOrderStatus(orderId, status);
        setOrders((current) =>
          current.map((order) => (order.id === orderId ? updatedOrder : order))
        );
        addToast(`Order moved to ${status}.`, "success");
      },
    }),
    [addToast, error, loading, menuItems, orders]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider.");
  }

  return context;
}
