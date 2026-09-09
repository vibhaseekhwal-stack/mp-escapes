import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const ROLES = ["Super Admin", "Admin", "Editor"];

const DUMMY_RECORD = {
  name: "Priya Sharma",
  email: "priya@mpescapes.com",
  role: "Admin",
  status: "Active",
};

export default function EditAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(DUMMY_RECORD);
  const [submitting, setSubmitting] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/admin-users");
    }, 600);
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <button onClick={() => navigate("/admin-users")} className="flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft size={16} /> Back to Admin Users
      </button>
      <p className="text-sm text-muted">Editing admin user ID #{id}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-5 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Admin Details</h2>
          <div>
            <label className="label-field">Name</label>
            <input className="input-field" value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div>
            <label className="label-field">Email</label>
            <input type="email" className="input-field" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          <div>
            <label className="label-field">Role</label>
            <select className="input-field" value={form.role} onChange={(e) => update("role", e.target.value)}>
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-line accent-gold"
              checked={form.status === "Active"}
              onChange={(e) => update("status", e.target.checked ? "Active" : "Inactive")}
            />
            Active
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/admin-users")}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" disabled={submitting}>
            {submitting ? "Updating…" : "Update Admin"}
          </Button>
        </div>
      </form>
    </div>
  );
}
