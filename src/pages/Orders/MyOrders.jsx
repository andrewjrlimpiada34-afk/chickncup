import EmptyState from "../../components/Common/EmptyState";
import OrderCard from "../../components/Order/OrderCard";
import { useAppData } from "../../contexts/AppDataContext";
import { useAuth } from "../../contexts/AuthContext";

export default function MyOrdersPage() {
  const { user } = useAuth();
  const { orders } = useAppData();

  const myOrders = orders.filter((order) => order.userId === user.id);

  if (!myOrders.length) {
    return (
      <EmptyState
        title="No orders yet"
        description="Your placed orders will appear here with their latest status."
      />
    );
  }

  return (
    <section className="stack-md">
      <div className="section-heading">
        <div>
          <p className="eyebrow">My Orders</p>
          <h1>Order history</h1>
        </div>
      </div>
      {myOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </section>
  );
}
