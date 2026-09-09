import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImageOff, Star, Trash2 } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const DUMMY_RECORD = {
  title: "Khajuraho Temple Carvings",
  category: "Heritage",
  featured: true,
  uploadedDate: "12 Jul 2026",
  uploadedBy: "Priya Sharma",
};

export default function ViewMedia() {
  const navigate = useNavigate();
  const { id } = useParams();
  const m = DUMMY_RECORD;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <button onClick={() => navigate("/gallery")} className="flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft size={16} /> Back to Gallery
      </button>

      <div className="card overflow-hidden">
        <div className="flex aspect-video items-center justify-center bg-black-charcoal text-white/30">
          <ImageOff size={32} />
        </div>
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-xl font-semibold text-ink">{m.title}</h2>
            {m.featured && <span className="badge bg-gold/10 text-gold-hover">Featured</span>}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">Category</p>
              <p className="mt-1 text-ink">{m.category}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">Uploaded</p>
              <p className="mt-1 text-ink">{m.uploadedDate} by {m.uploadedBy}</p>
            </div>
          </div>
          <div className="flex gap-3 border-t border-line pt-4">
            <Button variant="outline" icon={Star} size="sm">
              {m.featured ? "Unfeature" : "Mark Featured"}
            </Button>
            <Button
              variant="danger"
              icon={Trash2}
              size="sm"
              className="!bg-white"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
