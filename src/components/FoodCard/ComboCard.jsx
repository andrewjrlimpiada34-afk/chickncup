import { formatCurrency } from "../../utils/format";

export default function ComboCard({ item, onAddToCart }) {
  return (
    <article className="combo-card">
      <img src={item.image} alt={item.name} className="combo-card__image" />
      <div className="combo-card__body">
        <div>
          <p className="eyebrow">{item.code}</p>
          <h3>{item.name}</h3>
          <p>{item.items.join(" + ")} with rice included.</p>
        </div>
        <div className="combo-card__footer">
          <strong>{formatCurrency(item.price)}</strong>
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
