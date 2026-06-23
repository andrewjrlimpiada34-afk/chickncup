import { useMemo } from "react";
import { useAppData } from "../../contexts/AppDataContext";
import { ORDER_STATUSES } from "../../utils/constants";
import { formatCurrency, formatDateTime } from "../../utils/format";

export default function AdminOrderManagementPage() {
  const { orders, changeOrderStatus } = useAppData();

  const sortedOrders = useMemo(
    () => [...orders].sort((first, second) => second.createdAt.localeCompare(first.createdAt)),
    [orders]
  );

  return (
    <section className="stack-md">
      <div className="section-card">
        <p className="eyebrow">Admin Order Management</p>
        <h1>Manage customer orders and statuses</h1>
      </div>

      <div className="order-admin-grid">
        {sortedOrders.map((order) => (
          <article key={order.id} className="section-card">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{order.id}</p>
                <h2>{order.customerName}</h2>
                <p>{formatDateTime(order.createdAt)}</p>
              </div>
              <strong>{formatCurrency(order.total)}</strong>
            </div>
            <p>{order.contactNumber}</p>
            <p>{order.address || "Pickup order"}</p>
            <p>
              {order.fulfillmentMethod} | {order.paymentMethod}
            </p>
            <p>Notes: {order.notes || "None"}</p>
            <ul className="compact-list">
              {order.items.map((item) => (
                <li key={`${order.id}-${item.id}`}>
                  {item.quantity}x {item.name}
                </li>
              ))}
            </ul>
            <label>
              Update Status
              <select
                value={order.status}
                onChange={(event) => changeOrderStatus(order.id, event.target.value)}
              >
                {ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </article>
        ))}
      </div>
    </section>
  );
}
