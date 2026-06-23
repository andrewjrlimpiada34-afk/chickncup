import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BRAND } from "../../utils/constants";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/">
          <span className="brand-mark">CNC</span>
          <div>
            <strong>{BRAND.name}</strong>
            <p>{BRAND.tagline}</p>
          </div>
        </Link>
      </div>
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setOpen((current) => !current)}
      >
        Menu
      </button>
      <nav className={open ? "navbar__links open" : "navbar__links"}>
        <NavLink to="/" end onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/menu" onClick={() => setOpen(false)}>
          Menu
        </NavLink>
        <NavLink to="/orders" onClick={() => setOpen(false)}>
          My Orders
        </NavLink>
        <NavLink to="/tracking" onClick={() => setOpen(false)}>
          Tracking
        </NavLink>
        <NavLink to="/profile" onClick={() => setOpen(false)}>
          Profile
        </NavLink>
        {isAdmin && (
          <NavLink to="/admin" onClick={() => setOpen(false)}>
            Admin
          </NavLink>
        )}
        <NavLink to="/cart" className="cart-link" onClick={() => setOpen(false)}>
          Cart
          <span>{totalItems}</span>
        </NavLink>
        {user ? (
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              logout();
              setOpen(false);
            }}
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login" onClick={() => setOpen(false)}>
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}
