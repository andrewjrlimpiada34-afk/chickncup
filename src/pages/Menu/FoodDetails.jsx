import { Link, useParams } from "react-router-dom";
import EmptyState from "../../components/Common/EmptyState";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { useAppData } from "../../contexts/AppDataContext";
import { useCart } from "../../contexts/CartContext";
import { formatCurrency } from "../../utils/format";

export default function FoodDetailsPage() {
  const { code } = useParams();
  const { menuItems, loading } = useAppData();
  const { addToCart } = useCart();

  if (loading) {
    return <LoadingSpinner label="Loading item details..." />;
  }

  const item = menuItems.find((menuItem) => menuItem.code === code);

  if (!item) {
    return (
      <EmptyState
        title="Food item not found"
        description="The menu item you're looking for is not available."
        action={
          <Link to="/menu" className="primary-button">
            Return to Menu
          </Link>
        }
      />
    );
  }

  return (
    <section className="details-card">
      <img src={item.image} alt={item.name} className="details-card__image" />
      <div className="details-card__body">
        <p className="eyebrow">{item.code}</p>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        {item.items && <p>Combo contents: {item.items.join(" + ")}</p>}
        <strong>{formatCurrency(item.price)}</strong>
        <p className="helper-text">
          {item.available ? "Available for ordering now." : "Currently sold out."}
        </p>
        <div className="hero-actions">
          <button
            type="button"
            className="primary-button"
            disabled={!item.available}
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
          <Link to="/menu" className="secondary-button">
            Back to Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
