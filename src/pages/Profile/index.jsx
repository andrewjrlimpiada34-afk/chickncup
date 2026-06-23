import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfilePage() {
  const { user, updateProfile, loading } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateProfile(form);
  };

  return (
    <section className="section-card profile-card">
      <p className="eyebrow">Profile</p>
      <h1>Account details</h1>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
          />
        </label>
        <label>
          Contact Number
          <input
            type="text"
            value={form.phone}
            onChange={(event) =>
              setForm((current) => ({ ...current, phone: event.target.value }))
            }
          />
        </label>
        <label className="full-width">
          Address
          <textarea
            rows="4"
            value={form.address}
            onChange={(event) =>
              setForm((current) => ({ ...current, address: event.target.value }))
            }
          />
        </label>
        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
}
