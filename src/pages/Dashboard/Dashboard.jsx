import {
  MapPinned,
  CheckCircle2,
  NotebookTabs,
  BookOpenText,
  Images,
  Users,
} from "lucide-react";
import StatsCard from "./StatsCard.jsx";
import { VisitorAnalyticsChart, CategoryDistributionChart } from "./AnalyticsChart.jsx";

const stats = [
  { label: "Total Destinations", value: "48", icon: MapPinned, trend: "8.2%" },
  { label: "Published Destinations", value: "39", icon: CheckCircle2, trend: "5.1%" },
  { label: "Total Itineraries", value: "22", icon: NotebookTabs, trend: "3.4%" },
  { label: "Total Resources", value: "16", icon: BookOpenText, trend: "1.9%" },
  { label: "Gallery Images", value: "312", icon: Images, trend: "12.6%" },
  { label: "Total Visitors", value: "58.4K", icon: Users, trend: "9.8%" },
];

const recentDestinations = [
  { name: "Khajuraho Group of Temples", category: "Heritage", date: "2 Sep 2026" },
  { name: "Bandhavgarh National Park", category: "Wildlife", date: "30 Aug 2026" },
  { name: "Omkareshwar Temple", category: "Spiritual", date: "27 Aug 2026" },
  { name: "Taj Usha Kiran Palace, Gwalior", category: "Luxury & Experiences", date: "24 Aug 2026" },
];

const recentItineraries = [
  { title: "5-Day Heritage Trail — Gwalior to Orchha", duration: "5 Days", date: "3 Sep 2026" },
  { title: "Wildlife Weekend — Kanha & Bandhavgarh", duration: "4 Days", date: "1 Sep 2026" },
  { title: "Spiritual Circuit — Ujjain & Omkareshwar", duration: "3 Days", date: "29 Aug 2026" },
];

const recentActivity = [
  { text: "Priya Sharma published \"Pachmarhi Hill Station\"", time: "10 minutes ago" },
  { text: "Rahul Verma updated the Safety Information resource", time: "1 hour ago" },
  { text: "New itinerary \"Tribal Heritage of Dindori\" added", time: "3 hours ago" },
  { text: "Admin user \"Meera Joshi\" was activated", time: "Yesterday" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <VisitorAnalyticsChart />
        </div>
        <div className="xl:col-span-2">
          <CategoryDistributionChart />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-1">
          <h3 className="mb-4 font-display text-lg font-semibold text-ink">
            Recent Destinations
          </h3>
          <ul className="space-y-4">
            {recentDestinations.map((d) => (
              <li key={d.name} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-ink">{d.name}</p>
                  <p className="text-xs text-muted">{d.category}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">{d.date}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5 lg:col-span-1">
          <h3 className="mb-4 font-display text-lg font-semibold text-ink">
            Recent Itineraries
          </h3>
          <ul className="space-y-4">
            {recentItineraries.map((it) => (
              <li key={it.title} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-ink">{it.title}</p>
                  <p className="text-xs text-muted">{it.duration}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">{it.date}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5 lg:col-span-1">
          <h3 className="mb-4 font-display text-lg font-semibold text-ink">
            Recent Activity
          </h3>
          <ul className="space-y-4">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <div>
                  <p className="text-sm text-ink">{a.text}</p>
                  <p className="text-xs text-muted">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
