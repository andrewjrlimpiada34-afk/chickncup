import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, continueWithGoogle, loading } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleGoogle = async () => {
    try {
      await continueWithGoogle("register");
      navigate("/");
    } catch (error) {
      return null;
    }

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(form);
      navigate("/");
    } catch (error) {
      return null;
    }

    return null;
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Create Account</p>
        <h1>Register for faster Chick N' Cup ordering</h1>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              required
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
            />
          </label>
          <label>
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
            />
          </label>
          <label>
            Contact Number
            <input
              type="text"
              required
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({ ...current, phone: event.target.value }))
              }
            />
          </label>
          <label className="full-width">
            Address
            <textarea
              rows="3"
              required
              value={form.address}
              onChange={(event) =>
                setForm((current) => ({ ...current, address: event.target.value }))
              }
            />
          </label>
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
        <button type="button" className="secondary-button" onClick={handleGoogle}>
          Continue with Google
        </button>
        <p className="helper-text">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </section>
  );
}
