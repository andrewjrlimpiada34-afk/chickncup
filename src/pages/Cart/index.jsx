import { Link } from "react-router-dom";
import CartItem from "../../components/Cart/CartItem";
import EmptyState from "../../components/Common/EmptyState";
import { useCart } from "../../contexts/CartContext";
import { formatCurrency } from "../../utils/format";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  if (!items.length) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add your first Chick N' Cup meal to get started."
        action={
          <Link to="/menu" className="primary-button">
            Browse Menu
          </Link>
        }
      />
    );
  }

  return (
    <div className="cart-layout">
      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Cart</p>
            <h1>Your current order</h1>
          </div>
        </div>
        <div className="stack-md">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>
      </section>

      <aside className="section-card cart-summary">
        <p className="eyebrow">Summary</p>
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
        <p className="helper-text">
          Delivery note: Additional fee will be charged for delivery depending on
          location.
        </p>
        <Link to="/checkout" className="primary-button full-width-button">
          Proceed to Checkout
        </Link>
      </aside>
    </div>
  );
}
