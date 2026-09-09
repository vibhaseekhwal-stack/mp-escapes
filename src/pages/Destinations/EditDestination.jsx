import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const CATEGORIES = ["Heritage", "Spiritual", "Wildlife", "Luxury & Experiences"];

const DUMMY_RECORD = {
  name: "Khajuraho Group of Temples",
  slug: "khajuraho-group-of-temples",
  category: "Heritage",
  location: "Khajuraho, Chhatarpur",
  shortDescription: "A UNESCO World Heritage Site famed for intricate temple carvings.",
  fullDescription:
    "The Khajuraho Group of Monuments is a collection of Hindu and Jain temples known for their nagara-style architectural symbolism and intricate sculptures, built between 950 and 1050 CE.",
  bestTime: "October to March",
  highlights: "UNESCO World Heritage Site\nOver 20 surviving temples\nRenowned sculptural art",
  featured: true,
  published: true,
};

export default function EditDestination() {
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
      navigate("/destinations");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button
        onClick={() => navigate("/destinations")}
        className="flex items-center gap-2 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft size={16} /> Back to Destinations
      </button>

      <p className="text-sm text-muted">Editing destination ID #{id}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-5 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="label-field">Destination Name</label>
              <input
                className="input-field"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <div>
              <label className="label-field">Slug</label>
              <input
                className="input-field"
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
              />
            </div>
            <div>
              <label className="label-field">Category</label>
              <select
                className="input-field"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-field">Location</label>
              <input
                className="input-field"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card space-y-5 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            Description
          </h2>
          <div>
            <label className="label-field">Short Description</label>
            <textarea
              rows={2}
              className="input-field"
              value={form.shortDescription}
              onChange={(e) => update("shortDescription", e.target.value)}
            />
          </div>
          <div>
            <label className="label-field">Full Description</label>
            <textarea
              rows={5}
              className="input-field"
              value={form.fullDescription}
              onChange={(e) => update("fullDescription", e.target.value)}
            />
          </div>
          <div>
            <label className="label-field">Highlights</label>
            <textarea
              rows={3}
              className="input-field"
              value={form.highlights}
              onChange={(e) => update("highlights", e.target.value)}
            />
          </div>
          <div>
            <label className="label-field">Best Time to Visit</label>
            <input
              className="input-field"
              value={form.bestTime}
              onChange={(e) => update("bestTime", e.target.value)}
            />
          </div>
        </div>

        <div className="card space-y-5 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Media</h2>
          <div>
            <label className="label-field">Hero Image</label>
            <div className="flex h-36 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-surface text-muted">
              <UploadCloud size={22} />
              <p className="text-sm">Current hero image — click to replace</p>
            </div>
          </div>
        </div>

        <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2.5 text-sm text-ink">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-line accent-gold"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
              />
              Featured
            </label>
            <label className="flex items-center gap-2.5 text-sm text-ink">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-line accent-gold"
                checked={form.published}
                onChange={(e) => update("published", e.target.checked)}
              />
              Published
            </label>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => navigate("/destinations")}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" disabled={submitting}>
              {submitting ? "Updating…" : "Update Destination"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
