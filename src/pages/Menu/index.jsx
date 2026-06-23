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
    <div className="stack-xl">
      <section className="menu-banner">
        <p className="eyebrow">Menu Board</p>
        <h1>Pick your meal, combo, and flavor hit</h1>
        <p>
          Browse bold chicken meals and cleanly organized combos, just like a modern
          counter menu board.
        </p>
      </section>

      <section className="section-card">
        <div className="toolbar">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={setCategory}
          />
        </div>

        {filteredItems.length === 0 ? (
          <EmptyState
            title="No menu items found"
            description="Try another keyword or switch categories."
          />
        ) : (
          <>
            <div className="section-heading">
              <div>
                <p className="eyebrow">Chicken Meal</p>
                <h2>Singles</h2>
              </div>
            </div>
            <div className="grid-cards">
              {filteredItems
                .filter((item) => item.type === "single")
                .map((item) => (
                  <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
            </div>

            <div className="section-heading top-space">
              <div>
                <p className="eyebrow">Chick N' Match Combo</p>
                <h2>Combos</h2>
              </div>
            </div>
            <div className="combo-grid">
              {filteredItems
                .filter((item) => item.type === "combo")
                .map((item) => (
                  <ComboCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
