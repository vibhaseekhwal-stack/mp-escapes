import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, UploadCloud } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

export default function AddItinerary() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    duration: "",
    description: "",
    destinations: "",
    featured: false,
    published: false,
  });
  const [days, setDays] = useState([{ id: 1, title: "", description: "" }]);
  const [submitting, setSubmitting] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const addDay = () =>
    setDays((d) => [...d, { id: Date.now(), title: "", description: "" }]);

  const removeDay = (id) => setDays((d) => d.filter((day) => day.id !== id));

  const updateDay = (id, key, value) =>
    setDays((d) => d.map((day) => (day.id === id ? { ...day, [key]: value } : day)));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/itineraries");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <button
        onClick={() => navigate("/itineraries")}
        className="flex items-center gap-2 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft size={16} /> Back to Itineraries
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-5 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label-field">Title</label>
              <input
                className="input-field"
                placeholder="e.g. 5-Day Heritage Trail — Gwalior to Orchha"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label-field">Duration</label>
              <input
                className="input-field"
                placeholder="e.g. 5 Days"
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
              />
            </div>
            <div>
              <label className="label-field">Destinations</label>
              <input
                className="input-field"
                placeholder="e.g. Gwalior, Orchha, Khajuraho"
                value={form.destinations}
                onChange={(e) => update("destinations", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label-field">Description</label>
              <textarea
                rows={3}
                className="input-field"
                placeholder="Give travellers an overview of this itinerary"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">
              Day-wise Itinerary
            </h2>
            <Button type="button" variant="outline" size="sm" icon={Plus} onClick={addDay}>
              Add Day
            </Button>
          </div>
          <div className="space-y-4">
            {days.map((day, index) => (
              <div key={day.id} className="rounded-lg border border-line p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">Day {index + 1}</p>
                  {days.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDay(day.id)}
                      className="text-danger/80 hover:text-danger"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    className="input-field"
                    placeholder="Day title, e.g. Arrival in Gwalior & Fort Visit"
                    value={day.title}
                    onChange={(e) => updateDay(day.id, "title", e.target.value)}
                  />
                  <textarea
                    rows={2}
                    className="input-field"
                    placeholder="Describe the day's activities"
                    value={day.description}
                    onChange={(e) => updateDay(day.id, "description", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">
            Downloadable File
          </h2>
          <div className="flex h-28 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-surface text-muted">
            <UploadCloud size={20} />
            <p className="text-sm">Upload itinerary PDF</p>
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
            <Button type="button" variant="outline" onClick={() => navigate("/itineraries")}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" disabled={submitting}>
              {submitting ? "Saving…" : "Save Itinerary"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
