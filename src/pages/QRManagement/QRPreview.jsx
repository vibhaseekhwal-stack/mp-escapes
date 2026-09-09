import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, QrCode, Download, RefreshCcw } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const DUMMY_RECORD = {
  name: "Khajuraho Temples QR",
  redirect: "Khajuraho Group of Temples",
  scans: 1240,
  created: "10 Jun 2026",
};

export default function QRPreview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const qr = DUMMY_RECORD;

  return (
    <div className="mx-auto max-w-md space-y-6">
      <button onClick={() => navigate("/qr-management")} className="flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft size={16} /> Back to QR Management
      </button>

      <div className="card p-6 text-center">
        <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-xl border border-line bg-surface">
          <QrCode size={140} strokeWidth={1} className="text-ink" />
        </div>
        <h2 className="mt-5 font-display text-xl font-semibold text-ink">{qr.name}</h2>
        <p className="mt-1 text-sm text-muted">Redirects to: {qr.redirect}</p>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5 text-left">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Total Scans</p>
            <p className="mt-1 text-lg font-semibold text-ink">{qr.scans.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Created</p>
            <p className="mt-1 text-lg font-semibold text-ink">{qr.created}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <Button variant="gold" icon={Download}>Download QR</Button>
          <Button variant="outline" icon={RefreshCcw}>Regenerate</Button>
        </div>
      </div>
    </div>
  );
}
