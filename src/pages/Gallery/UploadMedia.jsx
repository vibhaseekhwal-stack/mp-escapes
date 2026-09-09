import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const CATEGORIES = ["Heritage", "Spiritual", "Wildlife", "Luxury & Experiences"];

export default function UploadMedia() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", category: CATEGORIES[0], featured: false });
  const [submitting, setSubmitting] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/gallery");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <button onClick={() => navigate("/gallery")} className="flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft size={16} /> Back to Gallery
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-5 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Upload Media</h2>
          <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-surface text-muted">
            <UploadCloud size={24} />
            <p className="text-sm">Click or drag images to upload</p>
            <p className="text-xs">Supports JPG, PNG — multiple files allowed</p>
          </div>
          <div>
            <label className="label-field">Title</label>
            <input
              className="input-field"
              placeholder="e.g. Khajuraho Temple Carvings"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label-field">Category</label>
            <select className="input-field" value={form.category} onChange={(e) => update("category", e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-line accent-gold"
              checked={form.featured}
              onChange={(e) => update("featured", e.target.checked)}
            />
            Mark as Featured
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/gallery")}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" disabled={submitting}>
            {submitting ? "Uploading…" : "Upload"}
          </Button>
        </div>
      </form>
    </div>
  );
}
