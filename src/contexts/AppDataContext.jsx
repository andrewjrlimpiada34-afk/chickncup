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
        const nextItems = await createMenuItem(payload);
        setMenuItems(nextItems);
        addToast("Menu item added.", "success");
      },
      editMenuItem: async (itemId, payload) => {
        const nextItems = await updateMenuItem(itemId, payload);
        setMenuItems(nextItems);
        addToast("Menu item updated.", "success");
      },
      removeMenuItem: async (itemId) => {
        const nextItems = await deleteMenuItem(itemId);
        setMenuItems(nextItems);
        addToast("Menu item deleted.", "success");
      },
      placeOrder: async (payload) => {
        const nextOrders = await createOrder(payload);
        setOrders(nextOrders);
        addToast("Order placed successfully.", "success");
        return nextOrders[0];
      },
      changeOrderStatus: async (orderId, status) => {
        const nextOrders = await updateOrderStatus(orderId, status);
        setOrders(nextOrders);
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
