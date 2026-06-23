import { createContext, useContext, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  continueWithGoogle,
  login,
  logout as logoutService,
  register,
  updateProfile,
} from "../services/authService";
import { useToast } from "./ToastContext";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { addToast } = useToast();
  const [user, setUser] = useLocalStorage("chickncup_session", null);
  const [loading, setLoading] = useState(false);

  const handleAuthAction = async (action, successMessage) => {
    setLoading(true);
    try {
      const authenticatedUser = await action();
      setUser(authenticatedUser);
      addToast(successMessage, "success");
      return authenticatedUser;
    } catch (error) {
      addToast(error.message, "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      login: (payload) =>
        handleAuthAction(() => login(payload), "Welcome back to Chick N' Cup."),
      register: (payload) =>
        handleAuthAction(
          () => register(payload),
          "Account created. You're ready to order."
        ),
      continueWithGoogle: (mode) =>
        handleAuthAction(
          () => continueWithGoogle(mode),
          "Signed in with Google successfully."
        ),
      logout: () => {
        logoutService();
        setUser(null);
        addToast("Logged out successfully.", "success");
      },
      updateProfile: async (updates) => {
        if (!user) {
          return null;
        }

        setLoading(true);
        try {
          const nextUser = await updateProfile(user.id, updates);
          setUser(nextUser);
          addToast("Profile updated.", "success");
          return nextUser;
        } catch (error) {
          addToast(error.message, "error");
          throw error;
        } finally {
          setLoading(false);
        }
      },
    }),
    [addToast, loading, setUser, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
