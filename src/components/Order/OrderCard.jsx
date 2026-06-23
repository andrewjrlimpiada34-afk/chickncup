import OrderStatusBadge from "./OrderStatusBadge";
import { formatCurrency, formatDateTime } from "../../utils/format";

export default function OrderCard({ order }) {
  return (
    <article className="order-card">
      <div className="order-card__header">
        <div>
          <p className="eyebrow">{order.id}</p>
          <h3>{order.customerName}</h3>
          <p>{formatDateTime(order.createdAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="order-card__body">
        <p>
          {order.fulfillmentMethod} | {order.paymentMethod}
        </p>
        <p>{order.contactNumber}</p>
        <p>{order.address || "Pickup order"}</p>
        <ul>
          {order.items.map((item) => (
            <li key={`${order.id}-${item.id}`}>
              {item.quantity}x {item.name}
            </li>
          ))}
        </ul>
        <strong>{formatCurrency(order.total)}</strong>
      </div>
    </article>
  );
}
