import {
  apiRequest,
  clearAuthToken,
  isApiConfigured,
  setAuthToken,
} from "../api/client";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const USERS_KEY = "chickncup_users";

const seedUsers = [
  {
    id: "admin-1",
    name: "Chick N' Cup Admin",
    email: "admin@chickncup.com",
    password: "admin123",
    role: "admin",
    phone: "09605763695",
    address: "Chick N' Cup Main Branch",
  },
];

function getUsers() {
  const users = loadFromStorage(USERS_KEY, seedUsers);
  if (!users.length) {
    saveToStorage(USERS_KEY, seedUsers);
    return seedUsers;
  }

  return users;
}

function persistUsers(users) {
  saveToStorage(USERS_KEY, users);
  return users;
}

function createMockToken(user) {
  return `mock-token-${user.id}`;
}

export async function login(credentials) {
  if (isApiConfigured()) {
    const response = await apiRequest("/auth/login", { method: "POST", body: credentials });
    setAuthToken(response.token);
    return response.user;
  }

  const users = getUsers();
  const matchedUser = users.find(
    (user) =>
      user.email.toLowerCase() === credentials.email.toLowerCase() &&
      user.password === credentials.password
  );

  if (!matchedUser) {
    throw new Error("Invalid email or password.");
  }

  setAuthToken(createMockToken(matchedUser));
  return matchedUser;
}

export async function register(payload) {
  if (isApiConfigured()) {
    const response = await apiRequest("/auth/register", { method: "POST", body: payload });
    setAuthToken(response.token);
    return response.user;
  }

  const users = getUsers();

  if (users.some((user) => user.email.toLowerCase() === payload.email.toLowerCase())) {
    throw new Error("An account with that email already exists.");
  }

  const newUser = {
    id: `user-${Date.now()}`,
    role: "customer",
    ...payload,
  };

  persistUsers([...users, newUser]);
  setAuthToken(createMockToken(newUser));
  return newUser;
}

export async function continueWithGoogle(mode = "login") {
  if (isApiConfigured()) {
    const response = await apiRequest(`/auth/google?mode=${mode}`, { method: "POST" });
    setAuthToken(response.token);
    return response.user;
  }

  const users = getUsers();
  const existingUser = users.find(
    (user) => user.email.toLowerCase() === "google.user@chickncup.demo"
  );

  if (existingUser) {
    setAuthToken(createMockToken(existingUser));
    return existingUser;
  }

  const newUser = {
    id: `user-google-${Date.now()}`,
    name: "Google Guest",
    email: "google.user@chickncup.demo",
    password: "oauth-only",
    role: "customer",
    phone: "",
    address: "",
  };

  persistUsers([...users, newUser]);
  setAuthToken(createMockToken(newUser));
  return newUser;
}

export async function updateProfile(userId, updates) {
  if (isApiConfigured()) {
    const response = await apiRequest("/users/me", { method: "PATCH", body: updates });
    return response.user;
  }

  const users = getUsers();
  const nextUsers = users.map((user) =>
    user.id === userId ? { ...user, ...updates } : user
  );
  persistUsers(nextUsers);
  return nextUsers.find((user) => user.id === userId);
}

export function logout() {
  clearAuthToken();
}
