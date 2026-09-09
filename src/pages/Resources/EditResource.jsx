import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const TYPES = [
  "Travel Guide",
  "Safety Information",
  "Transportation Guide",
  "Accommodation Guide",
  "Food Guide",
  "Emergency Information",
];

const DUMMY_RECORD = {
  title: "Travel Guide to Madhya Pradesh",
  type: "Travel Guide",
  description: "A comprehensive guide covering must-visit destinations, travel tips and cultural etiquette for Madhya Pradesh.",
  published: true,
};

export default function EditResource() {
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
      navigate("/resources");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button onClick={() => navigate("/resources")} className="flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft size={16} /> Back to Resources
      </button>
      <p className="text-sm text-muted">Editing resource ID #{id}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-5 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Resource Details</h2>
          <div>
            <label className="label-field">Title</label>
            <input className="input-field" value={form.title} onChange={(e) => update("title", e.target.value)} />
          </div>
          <div>
            <label className="label-field">Type</label>
            <select className="input-field" value={form.type} onChange={(e) => update("type", e.target.value)}>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field">Description</label>
            <textarea rows={4} className="input-field" value={form.description} onChange={(e) => update("description", e.target.value)} />
          </div>
        </div>

        <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-line accent-gold"
              checked={form.published}
              onChange={(e) => update("published", e.target.checked)}
            />
            Published
          </label>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => navigate("/resources")}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" disabled={submitting}>
              {submitting ? "Updating…" : "Update Resource"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
