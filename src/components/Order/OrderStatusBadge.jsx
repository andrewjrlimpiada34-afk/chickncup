export default function OrderStatusBadge({ status }) {
  const className = `order-status order-status--${status.toLowerCase().replace(/\s+/g, "-")}`;
  return <span className={className}>{status}</span>;
}
