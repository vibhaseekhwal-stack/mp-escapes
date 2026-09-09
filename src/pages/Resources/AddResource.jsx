import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const TYPES = [
  "Travel Guide",
  "Safety Information",
  "Transportation Guide",
  "Accommodation Guide",
  "Food Guide",
  "Emergency Information",
];

export default function AddResource() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", type: TYPES[0], description: "", published: false });
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-5 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Resource Details</h2>
          <div>
            <label className="label-field">Title</label>
            <input
              className="input-field"
              placeholder="e.g. Travel Guide to Madhya Pradesh"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
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
            <textarea
              rows={4}
              className="input-field"
              placeholder="Summarise what this resource covers"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>
          <div>
            <label className="label-field">File</label>
            <div className="flex h-28 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-surface text-muted">
              <UploadCloud size={20} />
              <p className="text-sm">Upload PDF or document</p>
            </div>
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
            Publish immediately
          </label>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => navigate("/resources")}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" disabled={submitting}>
              {submitting ? "Saving…" : "Save Resource"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
