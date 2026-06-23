import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BRAND } from "../../utils/constants";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

const primaryLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/menu", label: "Combos" },
  { to: "/orders", label: "My Orders" },
  { to: "/tracking", label: "Track Order" },
];

const mobileLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/cart", label: "Cart" },
  { to: "/orders", label: "Orders" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <>
      <header className="navbar">
        <div className="navbar__mobile-row">
          <button
            type="button"
            className={open ? "menu-toggle active" : "menu-toggle"}
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
          <Link to="/" className="navbar__brand">
            <span className="brand-mark">
              <span className="brand-mark__crosshair brand-mark__crosshair--h" />
              <span className="brand-mark__crosshair brand-mark__crosshair--v" />
              <span className="brand-mark__ring" />
              <span className="brand-mark__label">CHICK</span>
              <span className="brand-mark__core">CNC</span>
            </span>
            <span className="brand-copy">
              <strong>{BRAND.name}</strong>
              <small>{BRAND.tagline}</small>
            </span>
          </Link>
          <NavLink to="/cart" className="navbar__icon-link" aria-label="Cart">
            <span className="icon-shell">Cart</span>
            {totalItems > 0 && <span className="icon-badge">{totalItems}</span>}
          </NavLink>
        </div>

        <nav className="navbar__desktop">
          <div className="navbar__desktop-brand">
            <Link to="/" className="navbar__brand">
              <span className="brand-mark">
                <span className="brand-mark__crosshair brand-mark__crosshair--h" />
                <span className="brand-mark__crosshair brand-mark__crosshair--v" />
                <span className="brand-mark__ring" />
                <span className="brand-mark__label">CHICK</span>
                <span className="brand-mark__core">CNC</span>
              </span>
              <span className="brand-copy">
                <strong>{BRAND.name}</strong>
                <small>{BRAND.tagline}</small>
              </span>
            </Link>
          </div>
          <div className="navbar__desktop-links">
            {primaryLinks.map((link) => (
              <NavLink
                key={`${link.label}-${link.to}`}
                to={link.to}
                end={link.end}
              >
                {link.label}
              </NavLink>
            ))}
            {isAdmin && <NavLink to="/admin">Admin</NavLink>}
          </div>
          <div className="navbar__desktop-actions">
            <NavLink to="/cart" className="navbar__icon-link" aria-label="Cart">
              <span className="icon-shell">Cart</span>
              {totalItems > 0 && <span className="icon-badge">{totalItems}</span>}
            </NavLink>
            {user ? (
              <button
                type="button"
                className="primary-button navbar__login-button"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="primary-button navbar__login-button">
                Login / Register
              </NavLink>
            )}
          </div>
        </nav>

        <nav className={open ? "navbar__drawer open" : "navbar__drawer"}>
          {primaryLinks.map((link) => (
            <NavLink
              key={`drawer-${link.label}-${link.to}`}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/cart" onClick={() => setOpen(false)}>
            Cart ({totalItems})
          </NavLink>
          <NavLink to="/profile" onClick={() => setOpen(false)}>
            Profile
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" onClick={() => setOpen(false)}>
              Admin
            </NavLink>
          )}
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
              Login / Register
            </NavLink>
          )}
        </nav>
      </header>

      <nav className="mobile-bottom-nav">
        {mobileLinks.map((link) => (
          <NavLink key={`mobile-${link.label}`} to={link.to} end={link.end}>
            <span className="mobile-bottom-nav__icon">{link.label.slice(0, 1)}</span>
            <span>{link.label}</span>
            {link.to === "/cart" && totalItems > 0 ? (
              <span className="mobile-bottom-nav__badge">{totalItems}</span>
            ) : null}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
