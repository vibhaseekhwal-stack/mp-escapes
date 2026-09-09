import { Link } from "react-router-dom";
import { QrCode, Eye, Download, RefreshCcw } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const QR_CODES = [
  { id: "master", name: "Master QR", redirect: "Home — All Destinations", scans: 4820 },
  { id: 1, name: "Khajuraho Temples QR", redirect: "Khajuraho Group of Temples", scans: 1240 },
  { id: 2, name: "Bandhavgarh QR", redirect: "Bandhavgarh National Park", scans: 980 },
  { id: 3, name: "Omkareshwar QR", redirect: "Omkareshwar Temple", scans: 760 },
  { id: 4, name: "Sanchi Stupa QR", redirect: "Sanchi Stupa", scans: 610 },
];

export default function QRManagement() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-muted">
        Generate and monitor QR codes that link to destinations and campaigns.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {QR_CODES.map((qr) => (
          <div key={qr.id} className="card flex flex-col p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink">
                <QrCode size={30} strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-display text-base font-semibold text-ink">{qr.name}</p>
                <p className="text-xs text-muted">Redirects to: {qr.redirect}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted">
              <span className="font-semibold text-ink">{qr.scans.toLocaleString()}</span> total scans
            </p>
            <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
              <Link to={`/qr-management/preview/${qr.id}`}>
                <Button variant="outline" size="sm" icon={Eye}>Preview</Button>
              </Link>
              <Button variant="outline" size="sm" icon={Download}>Download</Button>
              <Button variant="ghost" size="sm" icon={RefreshCcw}>Regenerate</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
