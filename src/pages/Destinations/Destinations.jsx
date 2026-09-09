import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ImageOff,
} from "lucide-react";
import Button from "../../components/Button/Button.jsx";
import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";

const CATEGORIES = ["All", "Heritage", "Spiritual", "Wildlife", "Luxury & Experiences"];

const INITIAL_DESTINATIONS = [
  { id: 1, name: "Khajuraho Group of Temples", category: "Heritage", location: "Khajuraho", status: "Published", featured: true, createdDate: "12 Jun 2026" },
  { id: 2, name: "Bandhavgarh National Park", category: "Wildlife", location: "Umaria", status: "Published", featured: true, createdDate: "05 Jun 2026" },
  { id: 3, name: "Omkareshwar Temple", category: "Spiritual", location: "Khandwa", status: "Published", featured: false, createdDate: "28 May 2026" },
  { id: 4, name: "Usha Kiran Palace, Gwalior", category: "Luxury & Experiences", location: "Gwalior", status: "Draft", featured: true, createdDate: "20 May 2026" },
  { id: 5, name: "Sanchi Stupa", category: "Heritage", location: "Sanchi", status: "Published", featured: false, createdDate: "14 May 2026" },
  { id: 6, name: "Kanha National Park", category: "Wildlife", location: "Mandla", status: "Published", featured: false, createdDate: "02 May 2026" },
  { id: 7, name: "Maheshwar Ghats", category: "Spiritual", location: "Maheshwar", status: "Draft", featured: false, createdDate: "27 Apr 2026" },
  { id: 8, name: "Orchha Fort Complex", category: "Heritage", location: "Orchha", status: "Published", featured: true, createdDate: "19 Apr 2026" },
];

const statusStyle = {
  Published: "bg-success/10 text-success",
  Draft: "bg-muted/10 text-muted",
};

export default function Destinations() {
  const [destinations, setDestinations] = useState(INITIAL_DESTINATIONS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || d.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [destinations, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const togglePublish = (id) => {
    setDestinations((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "Published" ? "Draft" : "Published" }
          : d
      )
    );
  };

  const handleDelete = () => {
    setDestinations((prev) => prev.filter((d) => d.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            Manage all destinations shown on the MP Escapes platform.
          </p>
        </div>
        <Link to="/destinations/add">
          <Button variant="gold" icon={Plus}>
            Add Destination
          </Button>
        </Link>
      </div>

      <div className="card p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search destinations…"
              className="input-field pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  setPage(1);
                }}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  category === c
                    ? "border-gold bg-gold/10 text-gold-hover"
                    : "border-line text-muted hover:border-black/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px]">
            <thead>
              <tr>
                <th className="table-head">Image</th>
                <th className="table-head">Name</th>
                <th className="table-head">Category</th>
                <th className="table-head">Location</th>
                <th className="table-head">Status</th>
                <th className="table-head">Featured</th>
                <th className="table-head">Created</th>
                <th className="table-head text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((d) => (
                <tr key={d.id} className="hover:bg-surface/60">
                  <td className="table-cell">
                    <div className="flex h-11 w-14 items-center justify-center rounded-md bg-surface text-muted">
                      <ImageOff size={16} />
                    </div>
                  </td>
                  <td className="table-cell font-medium">{d.name}</td>
                  <td className="table-cell text-muted">{d.category}</td>
                  <td className="table-cell text-muted">{d.location}</td>
                  <td className="table-cell">
                    <span className={`badge ${statusStyle[d.status]}`}>{d.status}</span>
                  </td>
                  <td className="table-cell">
                    {d.featured ? (
                      <span className="badge bg-gold/10 text-gold-hover">Featured</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="table-cell text-muted">{d.createdDate}</td>
                  <td className="table-cell">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/destinations/view/${d.id}`}
                        className="rounded-md p-2 text-muted hover:bg-surface hover:text-ink"
                        title="View"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        to={`/destinations/edit/${d.id}`}
                        className="rounded-md p-2 text-muted hover:bg-surface hover:text-ink"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => togglePublish(d.id)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-muted hover:bg-surface hover:text-ink"
                        title="Toggle publish"
                      >
                        {d.status === "Published" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        onClick={() => setDeleteTarget(d)}
                        className="rounded-md p-2 text-danger/80 hover:bg-danger/5 hover:text-danger"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-14 text-center text-sm text-muted">
                    No destinations match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-line px-4 py-3">
          <p className="text-xs text-muted">
            Showing {paginated.length ? (page - 1) * pageSize + 1 : 0}–
            {Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-md p-1.5 text-muted hover:bg-surface disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-2 text-xs text-muted">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md p-1.5 text-muted hover:bg-surface disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        open={!!deleteTarget}
        title="Delete destination"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
