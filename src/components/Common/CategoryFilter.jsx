export default function CategoryFilter({ options, value, onChange }) {
  return (
    <div className="category-filter">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={value === option ? "pill-button active" : "pill-button"}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
