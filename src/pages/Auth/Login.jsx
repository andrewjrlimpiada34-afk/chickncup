import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, continueWithGoogle, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const redirectTo = location.state?.from || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await login(form);
      navigate(user.role === "admin" ? "/admin" : redirectTo);
    } catch (error) {
      return null;
    }

    return null;
  };

  const handleGoogle = async () => {
    try {
      await continueWithGoogle("login");
      navigate("/");
    } catch (error) {
      return null;
    }

    return null;
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome Back</p>
        <h1>Login to your Chick N' Cup account</h1>
        <p className="helper-text">
          Demo admin: <strong>admin@chickncup.com</strong> / <strong>admin123</strong>
        </p>
        <form className="form-grid" onSubmit={handleSubmit}>
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
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <button type="button" className="secondary-button" onClick={handleGoogle}>
          Continue with Google
        </button>
        <p className="helper-text">
          Need an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </section>
  );
}
