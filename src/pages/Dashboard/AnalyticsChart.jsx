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
  Legend,
} from "recharts";

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

const COLORS = ["#0B0B0B", "#C9A227", "#6B6B6B", "#E5E5E5"];

export function VisitorAnalyticsChart() {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-ink">
          Visitor Analytics
        </h3>
        <span className="badge bg-gold/10 text-gold-hover">Last 9 months</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={visitorData} margin={{ left: -20, right: 10 }}>
          <defs>
            <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A227" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#C9A227" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E5E5E5" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#6B6B6B" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: "1px solid #E5E5E5", fontSize: 13 }}
          />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#C9A227"
            strokeWidth={2}
            fill="url(#goldFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryDistributionChart() {
  return (
    <div className="card p-5">
      <h3 className="mb-4 font-display text-lg font-semibold text-ink">
        Destination Category Distribution
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
          >
            {categoryData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5E5E5", fontSize: 13 }} />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ fontSize: 12, color: "#6B6B6B" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
