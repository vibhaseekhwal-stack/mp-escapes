import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Eye, Trash2, Star, ImageOff } from "lucide-react";
import Button from "../../components/Button/Button.jsx";
import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";

const CATEGORIES = ["All", "Heritage", "Spiritual", "Wildlife", "Luxury & Experiences"];

const INITIAL_MEDIA = [
  { id: 1, title: "Khajuraho Temple Carvings", category: "Heritage", featured: true },
  { id: 2, title: "Tiger at Bandhavgarh", category: "Wildlife", featured: true },
  { id: 3, title: "Omkareshwar Ghats at Dusk", category: "Spiritual", featured: false },
  { id: 4, title: "Usha Kiran Palace Suite", category: "Luxury & Experiences", featured: false },
  { id: 5, title: "Sanchi Stupa Gateway", category: "Heritage", featured: false },
  { id: 6, title: "Kanha Meadows", category: "Wildlife", featured: false },
  { id: 7, title: "Maheshwar Handloom Weaving", category: "Spiritual", featured: true },
  { id: 8, title: "Orchha Fort at Sunrise", category: "Heritage", featured: false },
  { id: 9, title: "Pachmarhi Waterfalls", category: "Wildlife", featured: false },
  { id: 10, title: "Gwalior Fort Illuminated", category: "Heritage", featured: true },
];

export default function Gallery() {
  const [media, setMedia] = useState(INITIAL_MEDIA);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    return media.filter((m) => {
      const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || m.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [media, search, category]);

  const toggleFeatured = (id) => {
    setMedia((prev) => prev.map((m) => (m.id === id ? { ...m, featured: !m.featured } : m)));
  };

  const handleDelete = () => {
    setMedia((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Manage photography used across destinations and campaigns.
        </p>
        <Link to="/gallery/upload">
          <Button variant="gold" icon={Plus}>Upload Media</Button>
        </Link>
      </div>

      <div className="card p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search media…"
              className="input-field pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((m) => (
          <div key={m.id} className="group card overflow-hidden">
            <div className="relative flex aspect-[4/3] items-center justify-center bg-black-charcoal text-white/30">
              <ImageOff size={24} />
              {m.featured && (
                <span className="absolute left-2 top-2 badge bg-gold text-white">Featured</span>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <Link
                  to={`/gallery/view/${m.id}`}
                  className="rounded-full bg-white p-2 text-ink hover:bg-gold hover:text-white"
                >
                  <Eye size={15} />
                </Link>
                <button
                  onClick={() => toggleFeatured(m.id)}
                  className="rounded-full bg-white p-2 text-ink hover:bg-gold hover:text-white"
                >
                  <Star size={15} />
                </button>
                <button
                  onClick={() => setDeleteTarget(m)}
                  className="rounded-full bg-white p-2 text-danger hover:bg-danger hover:text-white"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="truncate text-sm font-medium text-ink">{m.title}</p>
              <p className="text-xs text-muted">{m.category}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="card col-span-full px-4 py-14 text-center text-sm text-muted">
            No images match your filters.
          </div>
        )}
      </div>

      <DeleteModal
        open={!!deleteTarget}
        title="Delete media"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
