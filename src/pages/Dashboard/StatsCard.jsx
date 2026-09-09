export default function StatsCard({ label, value, icon: Icon, trend, trendUp = true }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-ink">
            {value}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>
      {trend && (
        <p
          className={`mt-3 text-xs font-medium ${
            trendUp ? "text-success" : "text-danger"
          }`}
        >
          {trendUp ? "▲" : "▼"} {trend} vs last month
        </p>
      )}
    </div>
  );
}
