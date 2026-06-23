import { useMemo, useState } from "react";
import Modal from "../../components/Common/Modal";
import { useAppData } from "../../contexts/AppDataContext";
import comboBoardImage from "../../assets/images/combo-1.svg";

const emptyForm = {
  type: "single",
  category: "Chicken Meal",
  code: "",
  name: "",
  price: 0,
  description: "",
  image: comboBoardImage,
  available: true,
  items: "",
};

export default function AdminMenuManagementPage() {
  const { menuItems, addMenuItem, editMenuItem, removeMenuItem } = useAppData();
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const sortedItems = useMemo(
    () => [...menuItems].sort((first, second) => first.code.localeCompare(second.code)),
    [menuItems]
  );

  const openCreate = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      ...item,
      items: item.items?.join(", ") || "",
    });
    setOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      items: form.type === "combo" ? form.items.split(",").map((item) => item.trim()) : undefined,
    };

    if (editingItem) {
      await editMenuItem(editingItem.id, payload);
    } else {
      await addMenuItem(payload);
    }

    setOpen(false);
  };

  return (
    <section className="stack-md">
      <div className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Admin Menu Management</p>
            <h1>Edit meals, combos, pricing, and availability</h1>
          </div>
          <button type="button" className="primary-button" onClick={openCreate}>
            Add New Food Item
          </button>
        </div>
      </div>

      <div className="admin-table">
        <div className="admin-table__head">
          <span>Code</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Availability</span>
          <span>Actions</span>
        </div>
        {sortedItems.map((item) => (
          <div key={item.id} className="admin-table__row">
            <span>{item.code}</span>
            <span>{item.name}</span>
            <span>{item.category}</span>
            <span>PHP {item.price.toFixed(2)}</span>
            <span>{item.available ? "Available" : "Sold Out"}</span>
            <div className="row-actions">
              <button type="button" className="ghost-button" onClick={() => openEdit(item)}>
                Edit
              </button>
              <button
                type="button"
                className="ghost-button danger-button"
                onClick={() => removeMenuItem(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={editingItem ? "Edit Menu Item" : "Add Menu Item"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Type
            <select
              value={form.type}
              onChange={(event) =>
                setForm((current) => ({ ...current, type: event.target.value }))
              }
            >
              <option value="single">Single</option>
              <option value="combo">Combo</option>
            </select>
          </label>
          <label>
            Category
            <select
              value={form.category}
              onChange={(event) =>
                setForm((current) => ({ ...current, category: event.target.value }))
              }
            >
              <option value="Chicken Meal">Chicken Meal</option>
              <option value="Chick N' Match Combo">Chick N' Match Combo</option>
            </select>
          </label>
          <label>
            Code
            <input
              value={form.code}
              onChange={(event) =>
                setForm((current) => ({ ...current, code: event.target.value }))
              }
            />
          </label>
          <label>
            Name
            <input
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
            />
          </label>
          <label>
            Price
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(event) =>
                setForm((current) => ({ ...current, price: event.target.value }))
              }
            />
          </label>
          <label>
            Image URL
            <input
              value={form.image}
              onChange={(event) =>
                setForm((current) => ({ ...current, image: event.target.value }))
              }
            />
          </label>
          <label className="full-width">
            Description
            <textarea
              rows="3"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
            />
          </label>
          {form.type === "combo" && (
            <label className="full-width">
              Combo Items
              <input
                value={form.items}
                onChange={(event) =>
                  setForm((current) => ({ ...current, items: event.target.value }))
                }
                placeholder="CB, CW"
              />
            </label>
          )}
          <label className="checkbox-row full-width">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(event) =>
                setForm((current) => ({ ...current, available: event.target.checked }))
              }
            />
            Available for ordering
          </label>
          <button type="submit" className="primary-button">
            Save Item
          </button>
        </form>
      </Modal>
    </section>
  );
}
