import { Link } from "react-router-dom";
import {
  CalendarRange,
  Bus,
  CloudSun,
  Route,
  ShieldAlert,
  BedDouble,
  UtensilsCrossed,
  PhoneCall,
  Pencil,
} from "lucide-react";

const SECTIONS = [
  {
    key: "best-time",
    icon: CalendarRange,
    title: "Best Time to Visit",
    content: "October to March offers the most pleasant weather across Madhya Pradesh, ideal for heritage and wildlife travel.",
  },
  {
    key: "transportation",
    icon: Bus,
    title: "Transportation",
    content: "MP is well connected via rail, road and air, with major hubs in Bhopal, Indore, Gwalior and Jabalpur.",
  },
  {
    key: "weather",
    icon: CloudSun,
    title: "Weather",
    content: "Summers are hot and dry, monsoons run June to September, and winters are cool and comfortable.",
  },
  {
    key: "local-travel",
    icon: Route,
    title: "Local Travel",
    content: "Local taxis, auto-rickshaws and state transport buses connect most destinations across the state.",
  },
  {
    key: "safety",
    icon: ShieldAlert,
    title: "Safety",
    content: "Madhya Pradesh is generally safe for travellers; standard precautions are advised in wildlife zones.",
  },
  {
    key: "accommodation",
    icon: BedDouble,
    title: "Accommodation",
    content: "Options range from heritage palaces and luxury resorts to budget stays and forest lodges.",
  },
  {
    key: "food",
    icon: UtensilsCrossed,
    title: "Food",
    content: "Sample local specialties like Poha-Jalebi, Bhutte ka Kees, and Malwa-style thalis.",
  },
  {
    key: "emergency",
    icon: PhoneCall,
    title: "Emergency Contacts",
    content: "Police: 100 · Ambulance: 108 · Tourist Helpline: 1800-233-7777",
  },
];

export default function TravelInfo() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-muted">
        Manage the traveller-facing reference content shown across the platform.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {SECTIONS.map((s) => (
          <div key={s.key} className="card flex items-start gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
              <s.icon size={20} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-base font-semibold text-ink">{s.title}</h3>
                <Link
                  to={`/travel-info/edit/${s.key}`}
                  className="shrink-0 rounded-md p-1.5 text-muted hover:bg-surface hover:text-ink"
                >
                  <Pencil size={15} />
                </Link>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
