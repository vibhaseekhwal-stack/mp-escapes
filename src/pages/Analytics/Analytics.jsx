import {
  Users,
  Eye,
  MapPinned,
  Download,
  QrCode,
  Images,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatsCard from "../Dashboard/StatsCard.jsx";

const stats = [
  { label: "Total Visitors", value: "58.4K", icon: Users, trend: "9.8%" },
  { label: "Page Views", value: "184K", icon: Eye, trend: "6.3%" },
  { label: "Destination Views", value: "72.1K", icon: MapPinned, trend: "4.7%" },
  { label: "Itinerary Downloads", value: "3,420", icon: Download, trend: "11.2%" },
  { label: "QR Scans", value: "9,860", icon: QrCode, trend: "14.5%" },
  { label: "Gallery Views", value: "41.2K", icon: Images, trend: "7.1%" },
];

const visitorTrend = [
  { month: "Jan", value: 4200 }, { month: "Feb", value: 4800 }, { month: "Mar", value: 5600 },
  { month: "Apr", value: 6100 }, { month: "May", value: 7300 }, { month: "Jun", value: 8200 },
  { month: "Jul", value: 9100 }, { month: "Aug", value: 8700 }, { month: "Sep", value: 9600 },
];

const destinationViews = [
  { name: "Khajuraho", views: 12400 }, { name: "Bandhavgarh", views: 9800 },
  { name: "Omkareshwar", views: 8600 }, { name: "Sanchi", views: 7200 },
  { name: "Orchha", views: 6400 },
];

const itineraryDownloads = [
  { month: "Jan", value: 220 }, { month: "Feb", value: 260 }, { month: "Mar", value: 310 },
  { month: "Apr", value: 340 }, { month: "May", value: 400 }, { month: "Jun", value: 460 },
  { month: "Jul", value: 520 }, { month: "Aug", value: 480 }, { month: "Sep", value: 540 },
];

const qrScans = [
  { month: "Jan", value: 620 }, { month: "Feb", value: 700 }, { month: "Mar", value: 810 },
  { month: "Apr", value: 890 }, { month: "May", value: 1020 }, { month: "Jun", value: 1180 },
  { month: "Jul", value: 1340 }, { month: "Aug", value: 1260 }, { month: "Sep", value: 1420 },
];

function ChartCard({ title, children }) {
  return (
    <div className="card p-5">
      <h3 className="mb-4 font-display text-lg font-semibold text-ink">{title}</h3>
      {children}
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Visitors Over Time">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={visitorTrend} margin={{ left: -20, right: 10 }}>
              <CartesianGrid stroke="#E5E5E5" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5E5E5", fontSize: 13 }} />
              <Line type="monotone" dataKey="value" stroke="#0B0B0B" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Destination Views">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={destinationViews} margin={{ left: -20, right: 10 }}>
              <CartesianGrid stroke="#E5E5E5" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5E5E5", fontSize: 13 }} />
              <Bar dataKey="views" fill="#C9A227" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Itinerary Downloads">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={itineraryDownloads} margin={{ left: -20, right: 10 }}>
              <CartesianGrid stroke="#E5E5E5" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5E5E5", fontSize: 13 }} />
              <Line type="monotone" dataKey="value" stroke="#C9A227" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="QR Scans">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={qrScans} margin={{ left: -20, right: 10 }}>
              <CartesianGrid stroke="#E5E5E5" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5E5E5", fontSize: 13 }} />
              <Bar dataKey="value" fill="#0B0B0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
