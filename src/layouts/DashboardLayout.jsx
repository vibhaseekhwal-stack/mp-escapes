import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Bell, Search, Sparkles } from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/destinations": "Destinations",
  "/itineraries": "Itineraries",
  "/resources": "Resources",
  "/dos-donts": "Dos & Don'ts",
  "/gallery": "Gallery",
  "/travel-info": "Travel Information",
  "/contact": "Contact",
  "/analytics": "Analytics",
  "/qr-management": "QR Management",
  "/admin-users": "Admin Users",
  "/settings": "Settings",
};

function getTitle(pathname) {
  const match = Object.keys(PAGE_TITLES).find((key) =>
    pathname.startsWith(key)
  );

  return match ? PAGE_TITLES[match] : "MP Escapes";
}

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const pageTitle = getTitle(location.pathname);

  return (
    <div className="min-h-screen bg-surface text-ink">
      <Sidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="transition-all duration-300 lg:pl-[260px]">
        <header className="sticky top-0 z-30 border-b border-line bg-white/95 shadow-sm backdrop-blur-xl">
          <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-7">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink shadow-sm transition hover:border-gold hover:bg-gold/5 lg:hidden"
              >
                <Menu size={20} />
              </button>

              <div className="hidden h-9 w-px bg-line sm:block lg:hidden" />

              <div className="min-w-0">
                <div className="mb-0.5 hidden items-center gap-1.5 sm:flex">
                  <Sparkles size={11} className="text-gold" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-hover">
                    MP Escapes
                  </span>
                </div>

                <h1 className="truncate font-display text-xl font-semibold text-ink sm:text-2xl">
                  {pageTitle}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative hidden md:block">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type="text"
                  placeholder="Search..."
                  className="h-10 w-52 rounded-xl border border-line bg-surface/70 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted/60 hover:border-gold/40 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10 lg:w-60"
                />
              </div>

              <button
                type="button"
                className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-muted shadow-sm transition hover:border-gold hover:bg-gold/5 hover:text-ink"
              >
                <Bell
                  size={18}
                  className="transition group-hover:scale-105"
                />

                <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-gold ring-2 ring-white" />
              </button>

              <div className="h-8 w-px bg-line" />

              <button
                type="button"
                className="group flex items-center gap-2.5 rounded-xl px-1.5 py-1 transition hover:bg-surface"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-sm font-bold text-gold shadow-md transition group-hover:shadow-lg">
                  AA
                </div>

                <div className="hidden text-left leading-tight sm:block">
                  <p className="max-w-[125px] truncate text-sm font-semibold text-ink">
                    Aditi Agarwal
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />

                    <p className="text-[11px] font-medium text-muted">
                      Super Admin
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </header>

        <main className="min-h-[calc(100vh-73px)] p-4 sm:p-6 lg:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}