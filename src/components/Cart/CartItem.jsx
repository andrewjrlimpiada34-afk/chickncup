import { formatCurrency } from "../../utils/format";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item__body">
        <div>
          <p className="eyebrow">{item.code}</p>
          <h3>{item.name}</h3>
          <p>{formatCurrency(item.price)}</p>
        </div>
        <div className="cart-item__actions">
          <div className="quantity-control">
            <button type="button" onClick={() => onUpdateQuantity(item.id, "decrease")}>
              -
            </button>
            <span>{item.quantity}</span>
            <button type="button" onClick={() => onUpdateQuantity(item.id, "increase")}>
              +
            </button>
          </div>
          <button type="button" className="ghost-button" onClick={() => onRemove(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
