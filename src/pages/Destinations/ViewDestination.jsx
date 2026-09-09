import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, CalendarClock, ImageOff, Pencil } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const DUMMY_RECORD = {
  name: "Khajuraho Group of Temples",
  category: "Heritage",
  location: "Khajuraho, Chhatarpur",
  status: "Published",
  featured: true,
  createdDate: "12 Jun 2026",
  shortDescription: "A UNESCO World Heritage Site famed for intricate temple carvings.",
  fullDescription:
    "The Khajuraho Group of Monuments is a collection of Hindu and Jain temples known for their nagara-style architectural symbolism and intricate sculptures, built between 950 and 1050 CE by the Chandela dynasty.",
  bestTime: "October to March",
  highlights: [
    "UNESCO World Heritage Site",
    "Over 20 surviving temples",
    "Renowned sculptural art",
  ],
};

export default function ViewDestination() {
  const navigate = useNavigate();
  const { id } = useParams();
  const d = DUMMY_RECORD;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/destinations")}
          className="flex items-center gap-2 text-sm text-muted hover:text-ink"
        >
          <ArrowLeft size={16} /> Back to Destinations
        </button>
        <Link to={`/destinations/edit/${id}`}>
          <Button variant="outline" icon={Pencil}>
            Edit
          </Button>
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="flex h-56 items-center justify-center bg-black-charcoal text-white/40 sm:h-72">
          <ImageOff size={32} />
        </div>
        <div className="space-y-5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">{d.name}</h2>
              <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} /> {d.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarClock size={14} /> Added {d.createdDate}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="badge bg-gold/10 text-gold-hover">{d.category}</span>
              <span className="badge bg-success/10 text-success">{d.status}</span>
              {d.featured && <span className="badge bg-black/5 text-ink">Featured</span>}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-muted">{d.shortDescription}</p>

          <div>
            <h3 className="mb-2 font-display text-base font-semibold text-ink">
              About this destination
            </h3>
            <p className="text-sm leading-relaxed text-ink/80">{d.fullDescription}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-display text-base font-semibold text-ink">
                Highlights
              </h3>
              <ul className="space-y-1.5 text-sm text-ink/80">
                {d.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-display text-base font-semibold text-ink">
                Best Time to Visit
              </h3>
              <p className="text-sm text-ink/80">{d.bestTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
