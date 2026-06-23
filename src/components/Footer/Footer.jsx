import { BRAND } from "../../utils/constants";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <h3>{BRAND.name}</h3>
        <p>{BRAND.tagline}</p>
      </div>
      <div className="footer__grid">
        <div>
          <span>Contact</span>
          <p>{BRAND.phone}</p>
        </div>
        <div>
          <span>Facebook</span>
          <p>{BRAND.facebook}</p>
        </div>
        <div>
          <span>Service</span>
          <p>Delivery and pickup available</p>
        </div>
      </div>
    </footer>
  );
}
