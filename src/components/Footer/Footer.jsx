import { BRAND } from "../../utils/constants";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>{BRAND.name}</h3>
        <p>{BRAND.tagline}</p>
      </div>
      <div>
        <p>{BRAND.phone}</p>
        <p>Facebook: {BRAND.facebook}</p>
      </div>
    </footer>
  );
}
