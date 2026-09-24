import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MapPinned,
  Tags,
  FileText,
  Hotel,
  NotebookTabs,
  BookOpenText,
  Images,
  Compass,
  PhoneCall,
  BarChart3,
  QrCode,
  ShieldCheck,
  Settings,
  LogOut,
  X,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "Main",
    items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { to: "/destinations", label: "Destinations", icon: MapPinned },
      { to: "/categories", label: "Categories", icon: Tags },
      { to: "/guidelines", label: "Guidelines", icon: FileText },
      { to: "/hotels", label: "Hotels", icon: Hotel },
      { to: "/itineraries", label: "Itineraries", icon: NotebookTabs },
      { to: "/resources", label: "Resources", icon: BookOpenText },
      { to: "/gallery", label: "Gallery", icon: Images },
    ],
  },
  {
    label: "Management",
    items: [
      { to: "/travel-info", label: "Travel Information", icon: Compass },
      { to: "/contact", label: "Contact", icon: PhoneCall },
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/qr-management", label: "QR Management", icon: QrCode },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/admin-users", label: "Admin Users", icon: ShieldCheck },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function Sidebar({
  mobileOpen,
  onCloseMobile,
  collapsed,
  onToggleCollapse,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("mp_escapes_auth");
    navigate("/login");
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-black text-white transition-all duration-200 ease-out
        ${collapsed ? "lg:w-[76px]" : "lg:w-[264px]"}
        ${mobileOpen ? "w-[264px] translate-x-0" : "w-[264px] -translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gold/40 bg-gold/10 text-gold">
              <Compass size={18} strokeWidth={1.8} />
            </div>
            {!collapsed && (
              <div className="leading-tight">
                <p className="font-display text-lg font-semibold tracking-wide text-white">
                  MP <span className="text-gold">Escapes</span>
                </p>
                <p className="text-[11px] text-white/50">Admin Panel</p>
              </div>
            )}
          </div>
          <button
            onClick={onCloseMobile}
            className="text-white/70 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="mb-6">
              {!collapsed && (
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                  {section.label}
                </p>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={onCloseMobile}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "bg-white/[0.06] text-gold font-medium"
                            : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r bg-gold" />
                          )}
                          <item.icon size={18} strokeWidth={1.8} />
                          {!collapsed && <span>{item.label}</span>}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            <LogOut size={18} strokeWidth={1.8} />
            {!collapsed && <span>Logout</span>}
          </button>
          <button
            onClick={onToggleCollapse}
            className="mt-1 hidden w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/[0.05] hover:text-white lg:flex"
          >
            {collapsed ? (
              <ChevronsRight size={18} />
            ) : (
              <ChevronsLeft size={18} />
            )}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
