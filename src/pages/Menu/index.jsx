import { useMemo, useState } from "react";
import CategoryFilter from "../../components/Common/CategoryFilter";
import EmptyState from "../../components/Common/EmptyState";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import SearchBar from "../../components/Common/SearchBar";
import ComboCard from "../../components/FoodCard/ComboCard";
import FoodCard from "../../components/FoodCard/FoodCard";
import { useAppData } from "../../contexts/AppDataContext";
import { useCart } from "../../contexts/CartContext";
import { CATEGORY_OPTIONS } from "../../utils/constants";

export default function MenuPage() {
  const { menuItems, loading, error } = useAppData();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = category === "All" ? true : item.category === category;
      const query = search.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, menuItems, search]);

  if (loading) {
    return <LoadingSpinner label="Loading the menu board..." />;
  }

  if (error) {
    return <section className="section-card error-panel">{error}</section>;
  }

  return (
    <div className="menu-page">
      <section className="menu-page__hero">
        <div className="menu-page__hero-copy">
          <p className="eyebrow">Menu Board</p>
          <h1>Hot, crispy and built like a counter display</h1>
          <p>
            Search fast, filter by category, and order from a menu designed to feel
            like the actual Chick N' Cup poster on both desktop and mobile.
          </p>
        </div>
      </section>

      <section className="menu-page__controls">
        <div className="toolbar toolbar--menu">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={setCategory}
          />
        </div>
      </section>

      {filteredItems.length === 0 ? (
        <EmptyState
          title="No menu items found"
          description="Try another keyword or switch categories."
        />
      ) : (
        <>
          <section className="menu-page__section">
            <div className="section-heading section-heading--poster">
              <div>
                <p className="section-label">Chicken Meal</p>
                <h2>Singles</h2>
              </div>
              <span className="section-link">View all</span>
            </div>
            <div className="food-card-grid">
              {filteredItems
                .filter((item) => item.type === "single")
                .map((item) => (
                  <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
            </div>
          </section>

          <section className="menu-page__section">
            <div className="section-heading section-heading--poster">
              <div>
                <p className="section-label">Chick N' Match (Combos)</p>
                <h2>Combo meals</h2>
              </div>
              <span className="section-link">View all combos</span>
            </div>
            <div className="combo-strip">
              {filteredItems
                .filter((item) => item.type === "combo")
                .map((item) => (
                  <ComboCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
