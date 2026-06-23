import { formatCurrency } from "../../utils/format";

export default function ComboCard({ item, onAddToCart }) {
  return (
    <article className="combo-card">
      <img src={item.image} alt={item.name} className="combo-card__image" />
      <div className="combo-card__body">
        <div>
          <span className="combo-card__code">{item.code}</span>
          <h3>{item.name}</h3>
          <p>{item.items.join(" + ")}</p>
          <small>Rice included in every meal</small>
        </div>
        <div className="combo-card__footer">
          <strong className="price-mark">{formatCurrency(item.price)}</strong>
          <button
            type="button"
            className="primary-button"
            disabled={!item.available}
            onClick={() => onAddToCart(item)}
          >
            Add Combo
          </button>
        </div>
      </div>
    </article>
  );
}
