import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Pencil, Download, MapPin, Clock } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const DUMMY_RECORD = {
  title: "5-Day Heritage Trail — Gwalior to Orchha",
  duration: "5 Days",
  destinations: "Gwalior, Orchha, Khajuraho",
  description: "A curated journey through the region's finest forts, palaces and temples, blending history, architecture and local cuisine.",
  status: "Published",
  featured: true,
  createdDate: "03 Sep 2026",
  days: [
    { title: "Arrival in Gwalior & Fort Visit", description: "Explore Gwalior Fort and Jai Vilas Palace." },
    { title: "Gwalior to Orchha", description: "Drive to Orchha, visit the Chaturbhuj Temple." },
    { title: "Orchha Heritage Walk", description: "Explore Jahangir Mahal and the cenotaphs." },
    { title: "Orchha to Khajuraho", description: "Travel to Khajuraho, evening light and sound show." },
    { title: "Khajuraho Temples & Departure", description: "Guided tour of the Western Group of Temples." },
  ],
};

export default function ViewItinerary() {
  const navigate = useNavigate();
  const { id } = useParams();
  const it = DUMMY_RECORD;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/itineraries")}
          className="flex items-center gap-2 text-sm text-muted hover:text-ink"
        >
          <ArrowLeft size={16} /> Back to Itineraries
        </button>
        <Link to={`/itineraries/edit/${id}`}>
          <Button variant="outline" icon={Pencil}>Edit</Button>
        </Link>
      </div>

      <div className="card space-y-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">{it.title}</h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {it.duration}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {it.destinations}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="badge bg-success/10 text-success">{it.status}</span>
            {it.featured && <span className="badge bg-gold/10 text-gold-hover">Featured</span>}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-ink/80">{it.description}</p>

        <Button variant="outline" icon={Download} size="sm">
          Download Itinerary PDF
        </Button>

        <div className="border-t border-line pt-5">
          <h3 className="mb-4 font-display text-base font-semibold text-ink">
            Day-wise Plan
          </h3>
          <ol className="space-y-4">
            {it.days.map((day, index) => (
              <li key={day.title} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-gold">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{day.title}</p>
                  <p className="text-sm text-muted">{day.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="border-t border-line pt-4 text-xs text-muted">
          Created {it.createdDate}
        </p>
      </div>
    </div>
  );
}
