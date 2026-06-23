import { NavLink } from "react-router-dom";
import { BRAND } from "../../utils/constants";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div>
        <p className="eyebrow">Admin Control</p>
        <h2>{BRAND.name}</h2>
      </div>
      <nav className="admin-sidebar__nav">
        <NavLink to="/admin" end>
          Dashboard
        </NavLink>
        <NavLink to="/admin/menu">Menu Management</NavLink>
        <NavLink to="/admin/orders">Order Management</NavLink>
        <NavLink to="/">Back to Storefront</NavLink>
      </nav>
    </aside>
  );
}
