import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import GlassCard from "./GlassCard.jsx";

const visitorData = [
  { month: "Jan", visitors: 4200 },
  { month: "Feb", visitors: 4800 },
  { month: "Mar", visitors: 5600 },
  { month: "Apr", visitors: 6100 },
  { month: "May", visitors: 7300 },
  { month: "Jun", visitors: 8200 },
  { month: "Jul", visitors: 9100 },
  { month: "Aug", visitors: 8700 },
  { month: "Sep", visitors: 9600 },
];

const categoryData = [
  { name: "Heritage", value: 34 },
  { name: "Spiritual", value: 26 },
  { name: "Wildlife", value: 22 },
  { name: "Luxury & Experiences", value: 18 },
];

export const CATEGORY_COLORS = {
  Heritage: "#F3D77A",
  Spiritual: "#C9A227",
  Wildlife: "#8A6D12",
  "Luxury & Experiences": "#5A5A62",
};

function GlassTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d0d0f]/85 px-3.5 py-2.5 text-[13.5px] shadow-xl backdrop-blur-md">
      <p className="text-[#a8a59a]">{label ?? p.name}</p>
      <p className="mt-0.5 text-sm font-semibold text-[#f3d77a]">
        {p.value.toLocaleString()}
        {label ? " visitors" : "%"}
      </p>
    </div>
  );
}

export function VisitorAnalyticsChart({ index = 0 }) {
  return (
    <GlassCard index={index} className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-[#f4f1e8]">Visitor Analytics</h3>
        <span className="pill">Last 9 months</span>
      </div>
      <ResponsiveContainer width="100%" height={270}>
        <AreaChart data={visitorData} margin={{ left: -18, right: 10, top: 6 }}>
          <defs>
            <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A227" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#C9A227" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9C7A12" />
              <stop offset="100%" stopColor="#F3D77A" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="4 6" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 13.5, fill: "#8b887d" }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 13.5, fill: "#8b887d" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v / 1000}k`}
          />
          <Tooltip content={<GlassTooltip />} cursor={{ stroke: "rgba(201,162,39,0.4)", strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="url(#goldStroke)"
            strokeWidth={2.5}
            fill="url(#goldFill)"
            animationDuration={1600}
            activeDot={{ r: 5, fill: "#F3D77A", stroke: "#0B0B0B", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}

export function CategoryDistributionChart({ index = 0 }) {
  const total = categoryData.reduce((s, d) => s + d.value, 0);
  return (
    <GlassCard index={index} className="p-5">
      <h3 className="mb-2 font-display text-xl font-semibold text-[#f4f1e8]">
        Destination Categories
      </h3>
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={88}
              paddingAngle={3}
              stroke="none"
              cornerRadius={6}
              animationDuration={1400}
            >
              {categoryData.map((d) => (
                <Cell key={d.name} fill={CATEGORY_COLORS[d.name]} />
              ))}
            </Pie>
            <Tooltip content={<GlassTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="gold-text font-display text-4xl font-semibold">{total}%</span>
          <span className="text-[13px] text-[#a8a59a]">covered</span>
        </div>
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        {categoryData.map((d) => (
          <li key={d.name} className="flex items-center gap-2 text-[13.5px] text-[#b9b6aa]">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: CATEGORY_COLORS[d.name] }} />
            <span className="truncate">{d.name}</span>
            <span className="ml-auto font-medium text-[#f4f1e8]">{d.value}%</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}