import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Pencil, Mail, ShieldCheck, CalendarClock } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const DUMMY_RECORD = {
  name: "Priya Sharma",
  email: "priya@mpescapes.com",
  role: "Admin",
  status: "Active",
  createdDate: "14 Feb 2026",
};

export default function ViewAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();
  const u = DUMMY_RECORD;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate("/admin-users")} className="flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft size={16} /> Back to Admin Users
        </button>
        <Link to={`/admin-users/edit/${id}`}>
          <Button variant="outline" icon={Pencil}>Edit</Button>
        </Link>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-semibold text-gold">
            {u.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">{u.name}</h2>
            <span className="badge mt-1 bg-gold/10 text-gold-hover">{u.role}</span>
          </div>
        </div>

        <div className="mt-6 space-y-4 border-t border-line pt-5">
          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="text-muted" />
            <span className="text-ink">{u.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <ShieldCheck size={16} className="text-muted" />
            <span className={`badge ${u.status === "Active" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
              {u.status}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CalendarClock size={16} className="text-muted" />
            <span className="text-ink">Joined {u.createdDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
