import { useEffect, useState } from "react";import {
  MapPinned,
  CheckCircle2,
  NotebookTabs,
  BookOpenText,
  Images,
  Users,
  Plus,
} from "lucide-react";
import StatsCard from "./StatsCard.jsx";
import GlassCard from "./GlassCard.jsx";
import CommonLoader from "../../components/CommonLoader.jsx";
import {
  VisitorAnalyticsChart,
  CategoryDistributionChart,
  CATEGORY_COLORS,
} from "./AnalyticsChart.jsx";
import "./dashboard-theme.css";

const stats = [
  { label: "Total Destinations", value: "48", icon: MapPinned, trend: "8.2%" },
  {
    label: "Published Destinations",
    value: "39",
    icon: CheckCircle2,
    trend: "5.1%",
  },
  {
    label: "Total Itineraries",
    value: "22",
    icon: NotebookTabs,
    trend: "3.4%",
  },
  { label: "Total Resources", value: "16", icon: BookOpenText, trend: "1.9%" },
  { label: "Gallery Images", value: "312", icon: Images, trend: "12.6%" },
  { label: "Total Visitors", value: "58.4K", icon: Users, trend: "9.8%" },
];

const recentDestinations = [
  {
    name: "Khajuraho Group of Temples",
    category: "Heritage",
    date: "2 Sep 2026",
  },
  {
    name: "Bandhavgarh National Park",
    category: "Wildlife",
    date: "30 Aug 2026",
  },
  { name: "Omkareshwar Temple", category: "Spiritual", date: "27 Aug 2026" },
  {
    name: "Taj Usha Kiran Palace, Gwalior",
    category: "Luxury & Experiences",
    date: "24 Aug 2026",
  },
];

const recentItineraries = [
  {
    title: "5-Day Heritage Trail — Gwalior to Orchha",
    duration: "5 Days",
    date: "3 Sep 2026",
  },
  {
    title: "Wildlife Weekend — Kanha & Bandhavgarh",
    duration: "4 Days",
    date: "1 Sep 2026",
  },
  {
    title: "Spiritual Circuit — Ujjain & Omkareshwar",
    duration: "3 Days",
    date: "29 Aug 2026",
  },
];

const recentActivity = [
  {
    text: 'Priya Sharma published "Pachmarhi Hill Station"',
    time: "10 minutes ago",
  },
  {
    text: "Rahul Verma updated the Safety Information resource",
    time: "1 hour ago",
  },
  {
    text: 'New itinerary "Tribal Heritage of Dindori" added',
    time: "3 hours ago",
  },
  { text: 'Admin user "Meera Joshi" was activated', time: "Yesterday" },
];

function CardHead({ title }) {
  return (
    <div className="card-head mb-5 flex items-center justify-between gap-3">
      <h3 className="font-display text-xl font-semibold text-[#f4f1e8]">
        {title}
      </h3>

      <button type="button" className="view-all-btn">
        View all
      </button>
    </div>
  );
}
export default function Dashboard() {
  // Turns the whole page (main area + header) dark while this page is open
  useEffect(() => {
    document.documentElement.classList.add("dash-page");
    return () => document.documentElement.classList.remove("dash-page");
  }, []);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1000);

  return () => clearTimeout(timer);
}, []);
 if (loading) {
  return <CommonLoader />;
}

return ( 
  <div className="dash-root space-y-6">
      <div
        className="rise flex items-center justify-between"
        style={{ "--i": 0 }}
      >
        <div>
          <h2
            className="welcome-title font-display text-4xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(90deg, #b8860b 0%, #1a1a1a 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Welcome back
          </h2>{" "}
          <p className="mt-1 text-base text-[#b9b6aa]">
            Here is what changed across your destinations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="pill pill-green">
            <span className="live-dot" /> Live
          </span>
          <button type="button" className="btn">
            <Plus size={17} strokeWidth={2.2} /> New destination
          </button>
        </div>
      </div>

      <div className="stats-card-grid grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s, i) => (
          <div className="dashboard-stat-card" key={s.label}>
            <StatsCard {...s} index={i + 1} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <VisitorAnalyticsChart index={7} />
        </div>
        <div className="xl:col-span-2">
          <CategoryDistributionChart index={8} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GlassCard index={9} className="p-5">
          <CardHead title="Recent Destinations" />
          <ul className="space-y-5">
            {recentDestinations.map((d) => (
              <li
                key={d.name}
                className="row-hover flex items-start justify-between gap-3"
              >
                <div>
                  <p className="text-[15.5px] font-medium text-[#f4f1e8]">
                    {d.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[13.5px] text-[#b9b6aa]">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: CATEGORY_COLORS[d.category] }}
                    />
                    {d.category}
                  </p>
                </div>
                <span className="shrink-0 text-[13px] text-[#8f8c81]">
                  {d.date}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard index={10} className="p-5">
          <CardHead title="Recent Itineraries" />
          <ul className="space-y-5">
            {recentItineraries.map((it) => (
              <li
                key={it.title}
                className="row-hover flex items-start justify-between gap-3"
              >
                <div>
                  <p className="text-[15.5px] font-medium text-[#f4f1e8]">
                    {it.title}
                  </p>
                  <span className="pill pill-green mt-1.5">{it.duration}</span>
                </div>
                <span className="shrink-0 text-[13px] text-[#8f8c81]">
                  {it.date}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard index={11} className="p-5">
          <CardHead title="Recent Activity" />
          <ul className="relative space-y-5 before:absolute before:bottom-1 before:left-[3px] before:top-2 before:w-px before:bg-gradient-to-b before:from-[#C9A227]/50 before:to-transparent">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex gap-4">
                <span className="relative z-10 mt-1.5 h-[7px] w-[7px] shrink-0 rounded-full bg-[#E8C547] shadow-[0_0_10px_2px_rgba(201,162,39,0.6)]" />
                <div>
                  <p className="text-[15.5px] leading-snug text-[#f4f1e8]">
                    {a.text}
                  </p>
                  <p className="text-[13px] text-[#8f8c81]">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
