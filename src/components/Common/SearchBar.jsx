export default function SearchBar({ value, onChange, placeholder = "Search food..." }) {
  return (
    <label className="search-bar">
      <span className="visually-hidden">Search</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
