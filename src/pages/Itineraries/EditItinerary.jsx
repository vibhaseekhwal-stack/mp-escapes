import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const DUMMY_RECORD = {
  title: "5-Day Heritage Trail — Gwalior to Orchha",
  duration: "5 Days",
  destinations: "Gwalior, Orchha, Khajuraho",
  description: "A curated journey through the region's finest forts, palaces and temples.",
  featured: true,
  published: true,
};

const DUMMY_DAYS = [
  { id: 1, title: "Arrival in Gwalior & Fort Visit", description: "Explore Gwalior Fort and Jai Vilas Palace." },
  { id: 2, title: "Gwalior to Orchha", description: "Drive to Orchha, visit the Chaturbhuj Temple." },
  { id: 3, title: "Orchha Heritage Walk", description: "Explore Jahangir Mahal and the cenotaphs." },
];

export default function EditItinerary() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(DUMMY_RECORD);
  const [days, setDays] = useState(DUMMY_DAYS);
  const [submitting, setSubmitting] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const addDay = () => setDays((d) => [...d, { id: Date.now(), title: "", description: "" }]);
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
      <p className="text-sm text-muted">Editing itinerary ID #{id}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-5 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label-field">Title</label>
              <input className="input-field" value={form.title} onChange={(e) => update("title", e.target.value)} />
            </div>
            <div>
              <label className="label-field">Duration</label>
              <input className="input-field" value={form.duration} onChange={(e) => update("duration", e.target.value)} />
            </div>
            <div>
              <label className="label-field">Destinations</label>
              <input className="input-field" value={form.destinations} onChange={(e) => update("destinations", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="label-field">Description</label>
              <textarea rows={3} className="input-field" value={form.description} onChange={(e) => update("description", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Day-wise Itinerary</h2>
            <Button type="button" variant="outline" size="sm" icon={Plus} onClick={addDay}>
              Add Day
            </Button>
          </div>
          <div className="space-y-4">
            {days.map((day, index) => (
              <div key={day.id} className="rounded-lg border border-line p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">Day {index + 1}</p>
                  <button type="button" onClick={() => removeDay(day.id)} className="text-danger/80 hover:text-danger">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    className="input-field"
                    value={day.title}
                    onChange={(e) => updateDay(day.id, "title", e.target.value)}
                  />
                  <textarea
                    rows={2}
                    className="input-field"
                    value={day.description}
                    onChange={(e) => updateDay(day.id, "description", e.target.value)}
                  />
                </div>
              </div>
            ))}
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
            <Button type="button" variant="outline" onClick={() => navigate("/itineraries")}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" disabled={submitting}>
              {submitting ? "Updating…" : "Update Itinerary"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
