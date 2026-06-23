import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/format";

export default function FoodCard({ item, onAddToCart }) {
  const badgeLabel =
    item.code === "CB" ? "Best Seller" : item.code === "CW" ? "Spicy" : null;

  return (
    <article className="food-card">
      <div className="food-card__visual">
        {badgeLabel ? <span className="food-card__badge">{badgeLabel}</span> : null}
        <img src={item.image} alt={item.name} className="food-card__image" />
        <span className="food-card__code-chip">{item.code}</span>
      </div>
      <div className="food-card__body">
        <div className="food-card__meta">
          <span className="food-card__code-inline">{item.code}</span>
          <span className={item.available ? "status-pill" : "status-pill sold-out"}>
            {item.available ? "Available" : "Sold Out"}
          </span>
        </div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="food-card__footer">
          <strong className="price-mark">{formatCurrency(item.price)}</strong>
          <div className="food-card__actions">
            <Link to={`/menu/${item.code}`} className="ghost-button">
              Details
            </Link>
            <button
              type="button"
              className="primary-button"
              disabled={!item.available}
              onClick={() => onAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
