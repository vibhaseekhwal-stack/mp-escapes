import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UploadCloud, X } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const CATEGORIES = ["Heritage", "Spiritual", "Wildlife", "Luxury & Experiences"];

export default function AddDestination() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: CATEGORIES[0],
    location: "",
    shortDescription: "",
    fullDescription: "",
    bestTime: "",
    highlights: "",
    featured: false,
    published: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleNameChange = (value) => {
    update("name", value);
    update(
      "slug",
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  };

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
                placeholder="e.g. Khajuraho Group of Temples"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label-field">Slug</label>
              <input
                className="input-field"
                placeholder="khajuraho-group-of-temples"
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
                placeholder="e.g. Khajuraho, Chhatarpur"
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
              placeholder="A brief one-line summary for listing cards"
              value={form.shortDescription}
              onChange={(e) => update("shortDescription", e.target.value)}
            />
          </div>
          <div>
            <label className="label-field">Full Description</label>
            <textarea
              rows={5}
              className="input-field"
              placeholder="Detailed description shown on the destination page"
              value={form.fullDescription}
              onChange={(e) => update("fullDescription", e.target.value)}
            />
          </div>
          <div>
            <label className="label-field">Highlights</label>
            <textarea
              rows={3}
              className="input-field"
              placeholder="One highlight per line, e.g. UNESCO World Heritage Site"
              value={form.highlights}
              onChange={(e) => update("highlights", e.target.value)}
            />
          </div>
          <div>
            <label className="label-field">Best Time to Visit</label>
            <input
              className="input-field"
              placeholder="e.g. October to March"
              value={form.bestTime}
              onChange={(e) => update("bestTime", e.target.value)}
            />
          </div>
        </div>

        <div className="card space-y-5 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            Media
          </h2>
          <div>
            <label className="label-field">Hero Image</label>
            <div className="flex h-36 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-surface text-muted">
              <UploadCloud size={22} />
              <p className="text-sm">Click or drag to upload hero image</p>
              <p className="text-xs">PNG, JPG up to 5MB</p>
            </div>
          </div>
          <div>
            <label className="label-field">Gallery Images</label>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative flex aspect-square items-center justify-center rounded-lg bg-surface text-muted"
                >
                  <span className="text-xs">Image {i}</span>
                  <button
                    type="button"
                    className="absolute -right-1.5 -top-1.5 rounded-full bg-black p-1 text-white"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
              <div className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-line text-muted hover:border-gold hover:text-gold-hover">
                <UploadCloud size={18} />
                <span className="text-xs">Add</span>
              </div>
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
              Mark as Featured
            </label>
            <label className="flex items-center gap-2.5 text-sm text-ink">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-line accent-gold"
                checked={form.published}
                onChange={(e) => update("published", e.target.checked)}
              />
              Publish immediately
            </label>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/destinations")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gold" disabled={submitting}>
              {submitting ? "Saving…" : "Save Destination"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
