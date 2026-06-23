import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import EmptyState from "../../components/Common/EmptyState";
import OrderCard from "../../components/Order/OrderCard";
import { useAppData } from "../../contexts/AppDataContext";

export default function OrderTrackingPage() {
  const { orders } = useAppData();
  const [searchParams] = useSearchParams();
  const [manualOrderId, setManualOrderId] = useState("");
  const orderId = manualOrderId || searchParams.get("orderId") || "";

  const trackedOrder = useMemo(
    () => orders.find((order) => order.id === orderId),
    [orderId, orders]
  );

  return (
    <section className="stack-md">
      <div className="section-card">
        <p className="eyebrow">Track Order</p>
        <h1>Live order status</h1>
        <div className="toolbar">
          <label className="search-bar">
            <span>Order ID</span>
            <input
              type="text"
              value={manualOrderId}
              onChange={(event) => setManualOrderId(event.target.value.trim())}
              placeholder="Enter order ID like CNC-123..."
            />
          </label>
          <Link to="/orders" className="ghost-button">
            View My Orders
          </Link>
        </div>
      </div>
      {!orderId ? (
        <EmptyState
          title="No order selected"
          description="Place an order or enter an order ID to track it here."
        />
      ) : !trackedOrder ? (
        <EmptyState
          title="Order not found"
          description="We couldn't locate that order ID yet."
        />
      ) : (
        <OrderCard order={trackedOrder} />
      )}
    </section>
  );
}
