import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Bell, Search, Sparkles } from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import "./dashboard-layout.css";

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
    <div className="dashboard-layout min-h-screen">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Area */}
      <div className="dashboard-main transition-all duration-300 lg:pl-[260px]">
        {/* Header */}
        <header className="dashboard-header sticky top-0 z-30">
          <div className="dashboard-header-inner flex h-[76px] items-center justify-between px-4 sm:px-6 lg:px-7">
            
            {/* LEFT SECTION */}
            <div className="flex min-w-0 items-center gap-3">

              {/* Mobile Menu */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="header-icon-btn lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={20} strokeWidth={2} />
              </button>

              <div className="header-mobile-divider hidden h-9 w-px sm:block lg:hidden" />

              {/* Page Title */}
              <div className="min-w-0">
                
                <div className="header-brand hidden items-center gap-1.5 sm:flex">
                  <Sparkles
                    size={11}
                    className="header-sparkle"
                    strokeWidth={2.5}
                  />

                  <span className="header-brand-label">
                    MP Escapes
                  </span>
                </div>

                <h1 className="header-page-title truncate font-display text-xl sm:text-2xl">
                  {pageTitle}
                </h1>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-2.5 sm:gap-3">

              {/* Search */}
              <div className="header-search-wrap relative hidden md:block">
                <Search
                  size={16}
                  strokeWidth={2}
                  className="header-search-icon pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
                />

                <input
                  type="text"
                  placeholder="Search..."
                  className="header-search"
                />
              </div>

              {/* Notification */}
              <button
                type="button"
                className="header-icon-btn group relative"
                aria-label="Notifications"
              >
                <Bell
                  size={18}
                  strokeWidth={2}
                  className="transition duration-200 group-hover:scale-105"
                />

                <span className="notification-dot absolute right-2.5 top-2" />
              </button>

              {/* Divider */}
              <div className="header-divider h-8 w-px" />

              {/* Profile */}
              <button
                type="button"
                className="profile-btn group flex items-center gap-2.5"
              >
              
                {/* User Info */}
                <div className="hidden text-left leading-tight sm:block">
                  <p className="profile-name max-w-[125px] truncate text-sm font-semibold">
                    Aditi Agarwal
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="profile-status-dot h-1.5 w-1.5 rounded-full" />

                    <p className="profile-role text-[11px] font-medium">
                      Super Admin
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Animated Gold Line */}
          <div className="header-bottom-line" />
        </header>

        {/* Page Content */}
        <main className="dashboard-content min-h-[calc(100vh-77px)] p-4 sm:p-6 lg:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}