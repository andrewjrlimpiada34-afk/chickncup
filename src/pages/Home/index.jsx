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
  const combos = menuItems.filter((item) => item.type === "combo");
  const heroMeal = featuredMeals[0];
  const heroSides = featuredMeals.slice(1);
  const servicePoints = [
    {
      title: "Fast Delivery",
      text: "Quick and reliable door-to-door service.",
    },
    {
      title: "Quality Food",
      text: "Made with bold flavor and crisp texture.",
    },
    {
      title: "Secure Payment",
      text: "Cash, GCash, and pickup payment options.",
    },
    {
      title: "Best Service",
      text: "Friendly updates from order to handoff.",
    },
  ];

  if (loading) {
    return <LoadingSpinner label="Loading the Chick N' Cup storefront..." />;
  }

  if (error) {
    return <section className="section-card error-panel">{error}</section>;
  }

  return (
    <div className="home-page">
      <section className="hero-stage">
        <div className="hero-copy">
          <p className="eyebrow">Welcome To</p>
          <h1>Chick N' Cup</h1>
          <p className="hero-tagline">{BRAND.tagline}</p>
          <span className="hero-divider" />
          <p className="hero-description">
            Crispy, juicy, perfectly seasoned chicken meals made for desktop cravings
            and mobile ordering.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="primary-button">
              Order Now
            </Link>
            <Link to="/menu" className="ghost-button hero-outline-button">
              View Menu
            </Link>
          </div>
        </div>

        <div className="hero-showcase">
          {heroMeal ? (
            <img
              src={heroMeal.image}
              alt={heroMeal.name}
              className="hero-showcase__main"
            />
          ) : null}
          <div className="hero-showcase__cluster">
            {heroSides.map((item) => (
              <img key={item.id} src={item.image} alt={item.name} />
            ))}
          </div>
          <div className="hero-burst">
            <span>Hot &amp;</span>
            <strong>Crispy</strong>
          </div>
          <div className="hero-note">
            <span>Call</span>
            <strong>{BRAND.phone}</strong>
          </div>
        </div>
      </section>

      <section className="menu-showcase">
        <div className="section-heading section-heading--poster">
          <div>
            <p className="section-label">Chicken Meal</p>
            <h2>Hot, crispy &amp; made for you!</h2>
          </div>
          <Link to="/menu" className="section-link">
            View all
          </Link>
        </div>
        <div className="food-card-grid">
          {featuredMeals.map((item) => (
            <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="combo-showcase">
        <div className="section-heading section-heading--poster">
          <div>
            <p className="section-label">Chick N' Match (Combos)</p>
            <h2>Rice included in every meal</h2>
          </div>
          <Link to="/menu" className="section-link">
            View all combos
          </Link>
        </div>
        <div className="combo-strip">
          {combos.map((item) => (
            <ComboCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="service-strip">
        {servicePoints.map((point) => (
          <article key={point.title} className="service-strip__item">
            <h3>{point.title}</h3>
            <p>{point.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
