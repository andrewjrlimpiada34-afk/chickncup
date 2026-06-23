import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/Common/EmptyState";
import { useAppData } from "../../contexts/AppDataContext";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { FULFILLMENT_OPTIONS, PAYMENT_METHODS } from "../../utils/constants";
import { formatCurrency } from "../../utils/format";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const { placeOrder } = useAppData();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customerName: user?.name || "",
    contactNumber: user?.phone || "",
    address: user?.address || "",
    fulfillmentMethod: "Delivery",
    paymentMethod: "Cash on Delivery",
    notes: "",
  });

  if (!items.length) {
    return (
      <EmptyState
        title="No items to check out"
        description="Add meals to your cart before placing an order."
      />
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const createdOrder = await placeOrder({
        ...form,
        userId: user.id,
        items,
        total: subtotal,
      });
      clearCart();
      navigate(`/tracking?orderId=${createdOrder.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-layout">
      <form className="section-card form-grid" onSubmit={handleSubmit}>
        <div className="full-width">
          <p className="eyebrow">Checkout</p>
          <h1>Complete your order</h1>
        </div>
        <label>
          Customer Name
          <input
            type="text"
            required
            value={form.customerName}
            onChange={(event) =>
              setForm((current) => ({ ...current, customerName: event.target.value }))
            }
          />
        </label>
        <label>
          Contact Number
          <input
            type="text"
            required
            value={form.contactNumber}
            onChange={(event) =>
              setForm((current) => ({ ...current, contactNumber: event.target.value }))
            }
          />
        </label>
        <label className="full-width">
          Address
          <textarea
            rows="3"
            value={form.address}
            onChange={(event) =>
              setForm((current) => ({ ...current, address: event.target.value }))
            }
            placeholder="Required for delivery orders"
          />
        </label>
        <label>
          Delivery or Pickup
          <select
            value={form.fulfillmentMethod}
            onChange={(event) =>
              setForm((current) => ({ ...current, fulfillmentMethod: event.target.value }))
            }
          >
            {FULFILLMENT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Payment Method
          <select
            value={form.paymentMethod}
            onChange={(event) =>
              setForm((current) => ({ ...current, paymentMethod: event.target.value }))
            }
          >
            {PAYMENT_METHODS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="full-width">
          Order Notes
          <textarea
            rows="3"
            value={form.notes}
            onChange={(event) =>
              setForm((current) => ({ ...current, notes: event.target.value }))
            }
          />
        </label>
        <p className="helper-text full-width">
          Delivery fee note: Additional fee will be charged for delivery depending
          on location.
        </p>
        <button type="submit" className="primary-button" disabled={submitting}>
          {submitting ? "Placing order..." : "Place Order"}
        </button>
      </form>

      <aside className="section-card">
        <p className="eyebrow">Order Summary</p>
        <div className="stack-sm">
          {items.map((item) => (
            <div key={item.id} className="summary-row">
              <span>
                {item.quantity}x {item.name}
              </span>
              <strong>{formatCurrency(item.quantity * item.price)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-row top-space">
          <span>Total</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
      </aside>
    </div>
  );
}
