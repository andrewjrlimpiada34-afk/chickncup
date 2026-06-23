import { Link } from "react-router-dom";
import ComboCard from "../../components/FoodCard/ComboCard";
import FoodCard from "../../components/FoodCard/FoodCard";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { useAppData } from "../../contexts/AppDataContext";
import { useCart } from "../../contexts/CartContext";
import { BRAND } from "../../utils/constants";

export default function HomePage() {
  const { menuItems, loading, error } = useAppData();
  const { addToCart } = useCart();

  const featuredMeals = menuItems.filter((item) => item.type === "single").slice(0, 4);
  const combos = menuItems.filter((item) => item.type === "combo").slice(0, 2);

  if (loading) {
    return <LoadingSpinner label="Loading the Chick N' Cup storefront..." />;
  }

  if (error) {
    return <section className="section-card error-panel">{error}</section>;
  }

  return (
    <div className="stack-xl">
      <section className="hero-section">
        <div className="hero-section__content">
          <p className="eyebrow">Modern Chicken Shop</p>
          <h1>{BRAND.name}</h1>
          <p className="hero-tagline">{BRAND.tagline}</p>
          <p>
            Bold flavors, fast pickup, easy delivery, and a menu-board inspired
            ordering flow designed for both phones and desktops.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="primary-button">
              Order Now
            </Link>
            <Link to="/tracking" className="secondary-button">
              Track Order
            </Link>
          </div>
        </div>
        <div className="hero-board">
          <div className="hero-board__card">
            <span>Call Us</span>
            <strong>{BRAND.phone}</strong>
          </div>
          <div className="hero-board__card">
            <span>Facebook</span>
            <strong>{BRAND.facebook}</strong>
          </div>
          <div className="hero-board__card highlight">
            <span>Delivery Note</span>
            <strong>Fee depends on location</strong>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured Meals</p>
            <h2>Chicken classics with punchy flavor</h2>
          </div>
          <Link to="/menu" className="ghost-button">
            View Full Menu
          </Link>
        </div>
        <div className="grid-cards">
          {featuredMeals.map((item) => (
            <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Chick N' Match Combo</p>
            <h2>Meal-board combos with rice included</h2>
          </div>
        </div>
        <div className="combo-grid">
          {combos.map((item) => (
            <ComboCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );
}
