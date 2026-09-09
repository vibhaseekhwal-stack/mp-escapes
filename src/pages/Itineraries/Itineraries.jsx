import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Eye, Pencil, Trash2, FileText } from "lucide-react";
import Button from "../../components/Button/Button.jsx";
import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";

const INITIAL_ITINERARIES = [
  { id: 1, title: "5-Day Heritage Trail — Gwalior to Orchha", duration: "5 Days", destinations: "Gwalior, Orchha, Khajuraho", status: "Published", featured: true, createdDate: "03 Sep 2026" },
  { id: 2, title: "Wildlife Weekend — Kanha & Bandhavgarh", duration: "4 Days", destinations: "Kanha, Bandhavgarh", status: "Published", featured: true, createdDate: "01 Sep 2026" },
  { id: 3, title: "Spiritual Circuit — Ujjain & Omkareshwar", duration: "3 Days", destinations: "Ujjain, Omkareshwar, Maheshwar", status: "Draft", featured: false, createdDate: "29 Aug 2026" },
  { id: 4, title: "Tribal Heritage of Dindori", duration: "2 Days", destinations: "Dindori, Mandla", status: "Published", featured: false, createdDate: "24 Aug 2026" },
  { id: 5, title: "Luxury Palaces of Central India", duration: "6 Days", destinations: "Gwalior, Indore, Bhopal", status: "Draft", featured: true, createdDate: "18 Aug 2026" },
];

const statusStyle = {
  Published: "bg-success/10 text-success",
  Draft: "bg-muted/10 text-muted",
};

export default function Itineraries() {
  const [itineraries, setItineraries] = useState(INITIAL_ITINERARIES);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(
    () => itineraries.filter((i) => i.title.toLowerCase().includes(search.toLowerCase())),
    [itineraries, search]
  );

  const togglePublish = (id) => {
    setItineraries((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: i.status === "Published" ? "Draft" : "Published" } : i
      )
    );
  };

  const handleDelete = () => {
    setItineraries((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Curate multi-day travel itineraries across Madhya Pradesh.
        </p>
        <Link to="/itineraries/add">
          <Button variant="gold" icon={Plus}>
            Add Itinerary
          </Button>
        </Link>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search itineraries…"
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((it) => (
          <div key={it.id} className="card flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <FileText size={18} />
              </div>
              <span className={`badge ${statusStyle[it.status]}`}>{it.status}</span>
            </div>
            <h3 className="mt-3 font-display text-base font-semibold text-ink leading-snug">
              {it.title}
            </h3>
            <p className="mt-1 text-xs text-muted">{it.destinations}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted">
              <span className="badge bg-black/5 text-ink">{it.duration}</span>
              {it.featured && <span className="badge bg-gold/10 text-gold-hover">Featured</span>}
            </div>
            <p className="mt-3 text-xs text-muted">Created {it.createdDate}</p>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <div className="flex gap-1">
                <Link
                  to={`/itineraries/view/${it.id}`}
                  className="rounded-md p-2 text-muted hover:bg-surface hover:text-ink"
                >
                  <Eye size={16} />
                </Link>
                <Link
                  to={`/itineraries/edit/${it.id}`}
                  className="rounded-md p-2 text-muted hover:bg-surface hover:text-ink"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => setDeleteTarget(it)}
                  className="rounded-md p-2 text-danger/80 hover:bg-danger/5 hover:text-danger"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <button
                onClick={() => togglePublish(it.id)}
                className="text-xs font-medium text-gold hover:text-gold-hover"
              >
                {it.status === "Published" ? "Unpublish" : "Publish"}
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="card col-span-full px-4 py-14 text-center text-sm text-muted">
            No itineraries match your search.
          </div>
        )}
      </div>

      <DeleteModal
        open={!!deleteTarget}
        title="Delete itinerary"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
