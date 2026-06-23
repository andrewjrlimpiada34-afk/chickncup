import { apiRequest } from "../api/client";
import { seedMenuItems } from "../utils/menuData";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const MENU_KEY = "chickncup_menu";

export async function getMenuItems() {
  await apiRequest("/menu");
  const items = loadFromStorage(MENU_KEY, seedMenuItems);
  if (!items.length) {
    saveToStorage(MENU_KEY, seedMenuItems);
    return seedMenuItems;
  }

  return items;
}

export async function createMenuItem(payload) {
  await apiRequest("/admin/menu", { method: "POST", body: payload });
  const items = await getMenuItems();
  const nextItems = [
    ...items,
    {
      id: `${payload.code}-${Date.now()}`,
      ...payload,
    },
  ];
  saveToStorage(MENU_KEY, nextItems);
  return nextItems;
}

export async function updateMenuItem(itemId, payload) {
  await apiRequest(`/admin/menu/${itemId}`, { method: "PATCH", body: payload });
  const items = await getMenuItems();
  const nextItems = items.map((item) =>
    item.id === itemId ? { ...item, ...payload } : item
  );
  saveToStorage(MENU_KEY, nextItems);
  return nextItems;
}

export async function deleteMenuItem(itemId) {
  await apiRequest(`/admin/menu/${itemId}`, { method: "DELETE" });
  const items = await getMenuItems();
  const nextItems = items.filter((item) => item.id !== itemId);
  saveToStorage(MENU_KEY, nextItems);
  return nextItems;
}
