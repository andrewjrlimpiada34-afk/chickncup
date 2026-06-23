export default function CategoryFilter({ options, value, onChange }) {
  const labels = {
    All: "All",
    "Chicken Meal": "Chicken Meal",
    "Chick N' Match Combo": "Chick N' Match (Combos)",
  };

  return (
    <div className="category-filter">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={value === option ? "pill-button active" : "pill-button"}
          onClick={() => onChange(option)}
        >
          {labels[option] || option}
        </button>
      ))}
    </div>
  );
}
