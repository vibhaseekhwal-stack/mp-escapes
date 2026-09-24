import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Route,
  BookOpen,
  ShieldCheck,
  Images,
  Plane,
  Phone,
  BarChart3,
  QrCode,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { adminLogout } from "../../api/auth";

const NAV_SECTIONS = [
  {
    title: "Main",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        label: "Content Overview",
        path: "/content",
        icon: Compass,
      },
      {
        label: "Destinations",
        path: "/destinations",
        icon: Map,
      },
      {
        label: "Itineraries",
        path: "/itineraries",
        icon: Route,
      },
      {
        label: "Resources",
        path: "/resources",
        icon: BookOpen,
      },
      {
        label: "Dos & Don'ts",
        path: "/dos-donts",
        icon: ShieldCheck,
      },
      {
        label: "Gallery",
        path: "/gallery",
        icon: Images,
      },
      {
        label: "Travel Info",
        path: "/travel-info",
        icon: Plane,
      },
      {
        label: "Contact",
        path: "/contact",
        icon: Phone,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        label: "Analytics",
        path: "/analytics",
        icon: BarChart3,
      },
      {
        label: "QR Management",
        path: "/qr-management",
        icon: QrCode,
      },
      {
        label: "Admin Users",
        path: "/admin-users",
        icon: Users,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar({
  mobileOpen,
  onCloseMobile,
}) {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const data = await adminLogout();

      if (data?.success) {
        console.log(data.message);
      }
    } catch (error) {
      console.error(
        "Logout API error:",
        error.response?.data || error.message
      );
    } finally {
      localStorage.removeItem("mp_escapes_auth");
      localStorage.removeItem("mp_escapes_token");
      localStorage.removeItem("mp_escapes_admin");
      localStorage.removeItem("mp_escapes_keep_signed_in");

      setLoggingOut(false);
      navigate("/login", { replace: true });
    }
  };

  const handleNavigation = () => {
    onCloseMobile?.();
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-white/10 bg-[#0d0d0d] text-white shadow-2xl transition-transform duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#d8b76a] to-[#b38b42] text-black shadow-lg shadow-[#c9a45c]/20">
              <Compass size={22} strokeWidth={2.2} />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold tracking-wide text-white">
                MP Escapes
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a45c]">
                Admin Panel
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={handleNavigation}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-[#c9a45c] to-[#d7b66c] text-black shadow-lg shadow-[#c9a45c]/15"
                            : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 h-6 w-1 rounded-r-full bg-black/60" />
                          )}

                          <Icon
                            size={19}
                            strokeWidth={2}
                            className="shrink-0"
                          />

                          <span className="truncate">
                            {item.label}
                          </span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut
              size={19}
              strokeWidth={2}
              className={loggingOut ? "animate-pulse" : ""}
            />

            <span>
              {loggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
      </aside>

      <button
        type="button"
        onClick={onCloseMobile}
        className={`fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#111111] text-white shadow-lg lg:hidden ${
          mobileOpen ? "hidden" : "flex"
        }`}
      >
        <Menu size={20} />
      </button>
    </>
  );
}