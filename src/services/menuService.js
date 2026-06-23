import { apiRequest, isApiConfigured } from "../api/client";
import { resolveMenuImage } from "../utils/menuImages";
import { seedMenuItems } from "../utils/menuData";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const MENU_KEY = "chickncup_menu";

function normalizeMenuItem(item) {
  return {
    id: item._id || item.id,
    type: item.type,
    category: item.category,
    code: item.code,
    name: item.name,
    price: item.price,
    image: resolveMenuImage(item.code, item.imageUrl || item.image),
    available: item.available,
    description: item.description,
    items: item.comboItems || item.items || [],
  };
}

export async function getMenuItems() {
  if (isApiConfigured()) {
    const items = await apiRequest("/menu");
    return items.map(normalizeMenuItem);
  }

  const items = loadFromStorage(MENU_KEY, seedMenuItems);
  if (!items.length) {
    saveToStorage(MENU_KEY, seedMenuItems);
    return seedMenuItems;
  }

  return items;
}

export async function createMenuItem(payload) {
  if (isApiConfigured()) {
    const createdItem = await apiRequest("/admin/menu", {
      method: "POST",
      body: {
        ...payload,
        imageUrl: payload.image,
        comboItems: payload.items || [],
      },
    });
    return normalizeMenuItem(createdItem);
  }

  const items = await getMenuItems();
  const nextItem = {
    id: `${payload.code}-${Date.now()}`,
    ...payload,
  };
  saveToStorage(MENU_KEY, [...items, nextItem]);
  return nextItem;
}

export async function updateMenuItem(itemId, payload) {
  if (isApiConfigured()) {
    const updatedItem = await apiRequest(`/admin/menu/${itemId}`, {
      method: "PATCH",
      body: {
        ...payload,
        imageUrl: payload.image,
        comboItems: payload.items || [],
      },
    });
    return normalizeMenuItem(updatedItem);
  }

  const items = await getMenuItems();
  const nextItems = items.map((item) =>
    item.id === itemId ? { ...item, ...payload } : item
  );
  saveToStorage(MENU_KEY, nextItems);
  return nextItems.find((item) => item.id === itemId);
}

export async function deleteMenuItem(itemId) {
  if (isApiConfigured()) {
    await apiRequest(`/admin/menu/${itemId}`, { method: "DELETE" });
    return itemId;
  }

  const items = await getMenuItems();
  const nextItems = items.filter((item) => item.id !== itemId);
  saveToStorage(MENU_KEY, nextItems);
  return itemId;
}
