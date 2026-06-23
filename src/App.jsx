import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import AdminRoute from "./components/Common/AdminRoute";
import ToastNotification from "./components/Common/ToastNotification";
import HomePage from "./pages/Home";
import MenuPage from "./pages/Menu";
import FoodDetailsPage from "./pages/Menu/FoodDetails";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import MyOrdersPage from "./pages/Orders/MyOrders";
import OrderTrackingPage from "./pages/Orders/OrderTracking";
import ProfilePage from "./pages/Profile";
import AdminDashboardPage from "./pages/Admin/Dashboard";
import AdminMenuManagementPage from "./pages/Admin/MenuManagement";
import AdminOrderManagementPage from "./pages/Admin/OrderManagement";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="menu/:code" element={<FoodDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="tracking" element={<OrderTrackingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <MyOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="menu" element={<AdminMenuManagementPage />} />
          <Route path="orders" element={<AdminOrderManagementPage />} />
        </Route>
      </Routes>
      <ToastNotification />
    </>
  );
}

export default App;
