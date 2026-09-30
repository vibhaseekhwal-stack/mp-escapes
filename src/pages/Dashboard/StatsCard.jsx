import { useEffect, useState } from "react";
import GlassCard from "./GlassCard.jsx";

// "58.4K" -> { num: 58.4, suffix: "K", decimals: 1 }
function parseValue(v) {
  const m = String(v).match(/^([\d.,]+)(.*)$/);
  if (!m) return null;
  const raw = m[1].replace(/,/g, "");
  return {
    num: parseFloat(raw),
    suffix: m[2],
    decimals: raw.includes(".") ? raw.split(".")[1].length : 0,
  };
}

function useCountUp(target, decimals, duration = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n.toFixed(decimals);
}

export default function StatsCard({ label, value, icon: Icon, trend, trendUp = true, index = 0 }) {
  const parsed = parseValue(value);
  const counted = useCountUp(parsed ? parsed.num : 0, parsed ? parsed.decimals : 0);

  return (
    <GlassCard index={index} className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[15px] font-medium text-[#b9b6aa]">{label}</p>
          <p className="gold-text mt-2 font-display text-5xl font-semibold tracking-tight">
            {parsed ? `${counted}${parsed.suffix}` : value}
          </p>
        </div>
        <div className="icon-chip">
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>
      {trend && (
        <p className={`mt-4 text-[13.5px] font-medium ${trendUp ? "text-emerald-400" : "text-rose-400"}`}>
          {trendUp ? "▲" : "▼"} {trend}{" "}
          <span className="font-normal text-[#8f8c81]">vs last month</span>
        </p>
      )}
    </GlassCard>
  );
}