import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Compass,
  ShieldCheck,
  Waypoints,
  Radar,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Secure Access",
    desc: "Role-based & encrypted",
  },
  {
    icon: Waypoints,
    title: "Live Itinerary Sync",
    desc: "Real-time content updates",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "aakash@mpescapes.com", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("mp_escapes_auth", "true");
      setLoading(false);
      navigate("/dashboard");
    }, 700);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-4 sm:p-8">
      {/* ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-black/5 blur-3xl" />
      </div>

      <div className="relative flex w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-white shadow-elevated animate-fade-in-up">
        {/* LEFT — brand / status panel */}
        <div className="relative hidden w-[46%] shrink-0 overflow-hidden bg-black p-10 text-white lg:flex lg:flex-col lg:justify-between">
          {/* decorative texture */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(201,162,39,0.16),transparent_45%),radial-gradient(circle_at_85%_85%,rgba(201,162,39,0.12),transparent_50%)]" />
            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(#C9A227_1px,transparent_1px),linear-gradient(90deg,#C9A227_1px,transparent_1px)] bg-[size:36px_36px]" />
            <div className="absolute -right-10 top-16 h-40 w-40 rounded-full border border-gold/20 animate-float" />
            <div
              className="absolute -left-6 bottom-24 h-24 w-24 rounded-full border border-gold/20 animate-float"
              style={{ animationDelay: "1.4s" }}
            />
          </div>

          {/* logo */}
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold shadow-[0_0_0_1px_rgba(201,162,39,0.08)]">
              <Compass size={22} strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold leading-none tracking-wide">
                MP <span className="text-gold">Escapes</span>
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/45">
                Admin Panel
              </p>
            </div>
          </div>

          {/* status card */}
          <div className="relative mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                System Status
              </p>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.05]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <f.icon size={17} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{f.title}</p>
                    <p className="text-xs text-white/45">{f.desc}</p>
                  </div>
                  <ShieldCheck size={15} className="ml-auto shrink-0 text-gold/70" />
                </div>
              ))}
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.05]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <Radar size={17} strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">Visitor Tracking</p>
                  <p className="text-xs text-white/45">58.4K active this month</p>
                </div>
                <ShieldCheck size={15} className="ml-auto shrink-0 text-gold/70" />
              </div>
            </div>
          </div>

          {/* headline */}
          <div className="relative mt-10">
            <h2 className="font-display text-3xl font-semibold leading-snug">
              Admin Console
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Access the unified tourism control center. Curate destinations,
              manage itineraries, and monitor visitor activity across Madhya
              Pradesh — all from one refined workspace.
            </p>
          </div>
        </div>

        {/* RIGHT — form panel */}
        <div className="flex w-full flex-col justify-center p-8 sm:p-12 lg:w-[54%]">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-gold">
              <Compass size={20} strokeWidth={1.8} />
            </div>
            <p className="font-display text-xl font-semibold text-ink">
              MP <span className="text-gold">Escapes</span>
            </p>
          </div>

          <h1 className="font-display text-3xl font-semibold text-ink sm:text-[2.1rem]">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted">
            Enter your credentials to manage the platform operations.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="flex items-center gap-2.5 rounded-xl border border-danger/15 bg-danger/5 px-4 py-3 text-sm text-danger animate-fade-in">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                Email address
              </label>
              <div className="group relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-gold"
                />
                <input
                  type="email"
                  className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-4 text-sm text-ink outline-none transition-all duration-200 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10"
                  placeholder="you@mpescapes.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-gold hover:text-gold-hover">
                  Forgot password?
                </a>
              </div>
              <div className="group relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-gold"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-11 text-sm text-ink outline-none transition-all duration-200 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-sm text-muted">
              <input type="checkbox" className="h-4 w-4 rounded border-line accent-gold" />
              Keep me signed in
            </label>

            <Button
              type="submit"
              variant="gold"
              disabled={loading}
              className="group w-full !py-3.5 text-sm shadow-[0_10px_24px_-8px_rgba(201,162,39,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-10px_rgba(201,162,39,0.65)] active:translate-y-0"
            >
              {loading ? (
                "Signing in…"
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted">
            Demo access — enter any password to continue.
          </p>
        </div>
      </div>
    </div>
  );
}
