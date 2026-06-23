import OrderCard from "../../components/Order/OrderCard";
import { useAppData } from "../../contexts/AppDataContext";
import { formatCurrency } from "../../utils/format";

export default function AdminDashboardPage() {
  const { orders } = useAppData();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((order) => order.status === "Pending").length;
  const completedOrders = orders.filter((order) => order.status === "Completed").length;
  const totalSales = orders
    .filter((order) => order.status === "Completed")
    .reduce((sum, order) => sum + order.total, 0);

  const stats = [
    { label: "Total Orders", value: totalOrders },
    { label: "Pending Orders", value: pendingOrders },
    { label: "Completed Orders", value: completedOrders },
    { label: "Total Sales", value: formatCurrency(totalSales) },
  ];

  return (
    <div className="stack-xl">
      <section className="section-card">
        <p className="eyebrow">Admin Dashboard</p>
        <h1>Shop overview</h1>
        <div className="stats-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="stack-md">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recent Orders</p>
            <h2>Latest customer activity</h2>
          </div>
        </div>
        {orders.slice(0, 4).map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </section>
    </div>
  );
}
