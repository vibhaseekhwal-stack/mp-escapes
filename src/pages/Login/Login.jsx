import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

const API_URL = "https://mp-escapes.onrender.com/api/admin/login";

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

const panelVariants = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "admins@example.com",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message || "Invalid email or password. Please try again."
        );
      }

      if (!data.token) {
        throw new Error("Login successful, but authentication token was not received.");
      }

      localStorage.setItem("mp_escapes_auth", "true");
      localStorage.setItem("mp_escapes_token", data.token);

      if (data.admin) {
        localStorage.setItem("mp_escapes_admin", JSON.stringify(data.admin));
      }

      if (keepSignedIn) {
        localStorage.setItem("mp_escapes_keep_signed_in", "true");
      } else {
        localStorage.removeItem("mp_escapes_keep_signed_in");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.message || "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface p-4 sm:p-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl"
          animate={{
            x: [0, 25, -10, 0],
            y: [0, 20, -15, 0],
            scale: [1, 1.06, 0.98, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-black/5 blur-3xl"
          animate={{
            x: [0, -25, 10, 0],
            y: [0, -20, 15, 0],
            scale: [1, 0.96, 1.05, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full bg-gold/50"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-[12%] top-[28%] h-1.5 w-1.5 rounded-full bg-gold/40"
          animate={{
            y: [0, 18, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative flex w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-white shadow-elevated"
      >
        <motion.div
          className="relative hidden w-[46%] shrink-0 overflow-hidden bg-black p-10 text-white lg:flex lg:flex-col lg:justify-between"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(201,162,39,0.16),transparent_45%),radial-gradient(circle_at_85%_85%,rgba(201,162,39,0.12),transparent_50%)]" />

            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(#C9A227_1px,transparent_1px),linear-gradient(90deg,#C9A227_1px,transparent_1px)] bg-[size:36px_36px]" />

            <motion.div
              className="absolute -right-10 top-16 h-40 w-40 rounded-full border border-gold/20"
              animate={{
                y: [0, -18, 0],
                rotate: [0, 8, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute -left-6 bottom-24 h-24 w-24 rounded-full border border-gold/20"
              animate={{
                y: [0, 14, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            />

            <motion.div
              className="absolute right-[20%] top-[35%] h-2 w-2 rounded-full bg-gold/40"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
              }}
            />
          </div>

          <motion.div
            variants={itemVariants}
            className="relative flex items-center gap-3"
          >
            <motion.div
              whileHover={{
                rotate: -8,
                scale: 1.08,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold shadow-[0_0_0_1px_rgba(201,162,39,0.08)]"
            >
              <Compass size={22} strokeWidth={1.8} />
            </motion.div>

            <div>
              <p className="font-display text-2xl font-semibold leading-none tracking-wide">
                MP <span className="text-gold">Escapes</span>
              </p>

              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/45">
                Admin Panel
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
            whileHover={{
              y: -3,
              borderColor: "rgba(201,162,39,0.25)",
            }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                System Status
              </p>

              <span className="relative flex h-2.5 w-2.5">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-gold/60"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {FEATURES.map((f, index) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.55 + index * 0.12,
                  }}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold"
                  >
                    <f.icon size={17} strokeWidth={1.8} />
                  </motion.div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">
                      {f.title}
                    </p>
                    <p className="text-xs text-white/45">{f.desc}</p>
                  </div>

                  <ShieldCheck
                    size={15}
                    className="ml-auto shrink-0 text-gold/70"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                }}
                whileHover={{
                  x: 5,
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
              >
                <motion.div
                  animate={{
                    rotate: [0, 8, -8, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold"
                >
                  <Radar size={17} strokeWidth={1.8} />
                </motion.div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">
                    Visitor Tracking
                  </p>
                  <p className="text-xs text-white/45">
                    58.4K active this month
                  </p>
                </div>

                <ShieldCheck
                  size={15}
                  className="ml-auto shrink-0 text-gold/70"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative mt-10">
            <h2 className="font-display text-3xl font-semibold leading-snug">
              Admin Console
            </h2>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Access the unified tourism control center. Curate destinations,
              manage itineraries, and monitor visitor activity across Madhya
              Pradesh — all from one refined workspace.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex w-full flex-col justify-center p-8 sm:p-12 lg:w-[54%]"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-8 flex items-center gap-3 lg:hidden"
          >
            <motion.div
              whileHover={{ rotate: -8, scale: 1.06 }}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-gold"
            >
              <Compass size={20} strokeWidth={1.8} />
            </motion.div>

            <p className="font-display text-xl font-semibold text-ink">
              MP <span className="text-gold">Escapes</span>
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="font-display text-3xl font-semibold text-ink sm:text-[2.1rem]"
          >
            Welcome back
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48 }}
            className="mt-2 text-sm text-muted"
          >
            Enter your credentials to manage the platform operations.
          </motion.p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex items-center gap-2.5 rounded-xl border border-danger/15 bg-danger/5 px-4 py-3 text-sm text-danger"
              >
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
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
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62 }}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Password
                </label>

                <motion.a
                  href="#"
                  whileHover={{ x: -2 }}
                  className="text-xs font-medium text-gold hover:text-gold-hover"
                >
                  Forgot password?
                </motion.a>
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
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.label
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.69 }}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-muted"
            >
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="h-4 w-4 rounded border-line accent-gold"
              />
              Keep me signed in
            </motion.label>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.76 }}
            >
              <Button
                type="submit"
                variant="gold"
                disabled={loading}
                className="group w-full !py-3.5 text-sm shadow-[0_10px_24px_-8px_rgba(201,162,39,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-10px_rgba(201,162,39,0.65)] active:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="block h-4 w-4 rounded-full border-2 border-black/30 border-t-black"
                    />
                    Signing in…
                  </span>
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
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 text-center text-xs text-muted"
          >
            Secure admin access for MP Escapes.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}