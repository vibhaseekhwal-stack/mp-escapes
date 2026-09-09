import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Pencil, Download, FileText } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const DUMMY_RECORD = {
  title: "Travel Guide to Madhya Pradesh",
  type: "Travel Guide",
  status: "Published",
  publishedDate: "10 Aug 2026",
  description:
    "A comprehensive guide covering must-visit destinations, travel tips and cultural etiquette for Madhya Pradesh, designed to help travellers plan a smooth and memorable trip.",
};

export default function ViewResource() {
  const navigate = useNavigate();
  const { id } = useParams();
  const r = DUMMY_RECORD;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate("/resources")} className="flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft size={16} /> Back to Resources
        </button>
        <Link to={`/resources/edit/${id}`}>
          <Button variant="outline" icon={Pencil}>Edit</Button>
        </Link>
      </div>

      <div className="card space-y-5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <FileText size={22} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-2xl font-semibold text-ink">{r.title}</h2>
              <span className="badge bg-success/10 text-success">{r.status}</span>
            </div>
            <p className="mt-1 text-sm text-muted">{r.type} · Published {r.publishedDate}</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-ink/80">{r.description}</p>

        <Button variant="outline" icon={Download} size="sm">
          Download File
        </Button>
      </div>
    </div>
  );
}
