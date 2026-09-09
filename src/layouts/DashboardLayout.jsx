import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Bell, Search } from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/destinations": "Destinations",
  "/itineraries": "Itineraries",
  "/resources": "Resources",
  "/gallery": "Gallery",
  "/travel-info": "Travel Information",
  "/contact": "Contact",
  "/analytics": "Analytics",
  "/qr-management": "QR Management",
  "/admin-users": "Admin Users",
  "/settings": "Settings",
};

function getTitle(pathname) {
  const match = Object.keys(PAGE_TITLES).find((key) => pathname.startsWith(key));
  return match ? PAGE_TITLES[match] : "MP Escapes";
}

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />

      <div
        className={`transition-all duration-200 ${
          collapsed ? "lg:pl-[76px]" : "lg:pl-[264px]"
        }`}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-ink lg:hidden"
            >
              <Menu size={22} />
            </button>
            <h1 className="font-display text-xl font-semibold text-ink">
              {getTitle(location.pathname)}
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                placeholder="Search…"
                className="w-56 rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm placeholder:text-muted/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <button className="relative text-muted hover:text-ink">
              <Bell size={20} />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold" />
            </button>
            <div className="flex items-center gap-2.5 border-l border-line pl-3 sm:pl-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-gold">
                AA
              </div>
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-medium text-ink">Aditi Agarwal</p>
                <p className="text-xs text-muted">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
