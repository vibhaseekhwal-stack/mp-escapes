import { useState } from "react";
import { Image, Bell, UserCog, Palette } from "lucide-react";
import Button from "../../components/Button/Button.jsx";

export default function Settings() {
  const [general, setGeneral] = useState({
    cmsName: "MP Escapes",
    websiteName: "MP Escapes",
  });
  const [notifications, setNotifications] = useState({
    newSubmissions: true,
    weeklySummary: true,
    systemAlerts: false,
  });
  const [profile, setProfile] = useState({
    name: "Aditi Agarwal",
    email: "aditi@mpescapes.com",
    role: "Super Admin",
  });

  const updateGeneral = (key, value) => setGeneral((g) => ({ ...g, [key]: value }));
  const updateProfile = (key, value) => setProfile((p) => ({ ...p, [key]: value }));
  const toggleNotification = (key) =>
    setNotifications((n) => ({ ...n, [key]: !n[key] }));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="card space-y-5 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <Image size={18} strokeWidth={1.8} />
          </div>
          <h2 className="font-display text-lg font-semibold text-ink">General</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field">CMS Name</label>
            <input
              className="input-field"
              value={general.cmsName}
              onChange={(e) => updateGeneral("cmsName", e.target.value)}
            />
          </div>
          <div>
            <label className="label-field">Website Name</label>
            <input
              className="input-field"
              value={general.websiteName}
              onChange={(e) => updateGeneral("websiteName", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="label-field">Logo</label>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-line bg-surface text-muted">
              <Image size={22} />
            </div>
            <Button variant="outline" size="sm">Upload Logo</Button>
          </div>
        </div>
      </div>

      <div className="card space-y-5 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <Palette size={18} strokeWidth={1.8} />
          </div>
          <h2 className="font-display text-lg font-semibold text-ink">Theme</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "Black & Gold", colors: ["#0B0B0B", "#C9A227", "#FFFFFF"] },
            { name: "Charcoal & Gold", colors: ["#1A1A1A", "#C9A227", "#F8F8F6"] },
          ].map((theme, i) => (
            <button
              key={theme.name}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                i === 0 ? "border-gold bg-gold/5" : "border-line hover:border-black/20"
              }`}
            >
              <div className="flex -space-x-1.5">
                {theme.colors.map((c) => (
                  <span
                    key={c}
                    className="h-5 w-5 rounded-full border-2 border-white"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card space-y-5 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <Bell size={18} strokeWidth={1.8} />
          </div>
          <h2 className="font-display text-lg font-semibold text-ink">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: "newSubmissions", label: "New content submissions", desc: "Get notified when editors submit new content for review." },
            { key: "weeklySummary", label: "Weekly summary", desc: "Receive a weekly performance summary email." },
            { key: "systemAlerts", label: "System alerts", desc: "Get notified about system updates and maintenance." },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink">{n.label}</p>
                <p className="text-xs text-muted">{n.desc}</p>
              </div>
              <button
                onClick={() => toggleNotification(n.key)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  notifications[n.key] ? "bg-gold" : "bg-line"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    notifications[n.key] ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card space-y-5 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <UserCog size={18} strokeWidth={1.8} />
          </div>
          <h2 className="font-display text-lg font-semibold text-ink">Admin Profile</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field">Name</label>
            <input className="input-field" value={profile.name} onChange={(e) => updateProfile("name", e.target.value)} />
          </div>
          <div>
            <label className="label-field">Email</label>
            <input className="input-field" value={profile.email} onChange={(e) => updateProfile("email", e.target.value)} />
          </div>
          <div>
            <label className="label-field">Role</label>
            <input className="input-field" value={profile.role} disabled />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="gold">Save All Settings</Button>
      </div>
    </div>
  );
}
