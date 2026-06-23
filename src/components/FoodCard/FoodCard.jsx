import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/format";

export default function FoodCard({ item, onAddToCart }) {
  return (
    <article className="food-card">
      <img src={item.image} alt={item.name} className="food-card__image" />
      <div className="food-card__body">
        <div className="food-card__meta">
          <span>{item.code}</span>
          <span className={item.available ? "status-pill" : "status-pill sold-out"}>
            {item.available ? "Available" : "Sold Out"}
          </span>
        </div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="food-card__footer">
          <strong>{formatCurrency(item.price)}</strong>
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
