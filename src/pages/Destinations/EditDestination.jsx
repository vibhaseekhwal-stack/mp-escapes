
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  UploadCloud,
  MapPin,
  FileText,
  Image as ImageIcon,
  Settings2,
  CheckCircle2,
  Sparkles,
  Globe2,
  CalendarDays,
  Eye,
  X,
} from "lucide-react";
import Button from "../../components/Button/Button.jsx";

const CATEGORIES = [
  "Heritage",
  "Spiritual",
  "Wildlife",
  "Luxury & Experiences",
];

const DUMMY_RECORD = {
  name: "Khajuraho Group of Temples",
  slug: "khajuraho-group-of-temples",
  category: "Heritage",
  location: "Khajuraho, Chhatarpur",
  shortDescription:
    "A UNESCO World Heritage Site famed for intricate temple carvings.",
  fullDescription:
    "The Khajuraho Group of Monuments is a collection of Hindu and Jain temples known for their nagara-style architectural symbolism and intricate sculptures, built between 950 and 1050 CE.",
  bestTime: "October to March",
  highlights:
    "UNESCO World Heritage Site\nOver 20 surviving temples\nRenowned sculptural art",
  featured: true,
  published: true,
};

export default function EditDestination() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState(DUMMY_RECORD);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      navigate("/destinations");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f6] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* ================= HEADER ================= */}
        <div className="animate-[fadeIn_.5s_ease-out]">

          <button
            type="button"
            onClick={() => navigate("/destinations")}
            className="group mb-4 flex items-center gap-2 text-sm font-medium text-[#77736b] transition-all duration-300 hover:-translate-x-1 hover:text-[#a77b27]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e7e2d8] bg-white shadow-sm transition-all duration-300 group-hover:border-[#c7a35a] group-hover:bg-[#fffaf0]">
              <ArrowLeft size={16} />
            </span>

            Back to Destinations
          </button>

          <div className="flex flex-col gap-4 rounded-2xl border border-[#e9e4da] bg-white p-5 shadow-[0_8px_30px_rgba(60,50,30,0.05)] transition-all duration-500 hover:shadow-[0_12px_35px_rgba(60,50,30,0.08)] sm:p-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff7e5] text-[#b48735]">
                  <Sparkles size={18} />
                </span>

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b48735]">
                  Destination Management
                </span>
              </div>

              <h1 className="font-display text-2xl font-bold tracking-tight text-[#25231f] sm:text-3xl">
                Edit Destination
              </h1>

              <p className="mt-1 text-sm text-[#858078]">
                Update destination details, media and publishing settings.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-xl border border-[#eee8dc] bg-[#faf9f6] px-4 py-3 lg:self-auto">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3ead5] text-[#a77b27]">
                <Globe2 size={17} />
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-[#99938a]">
                  Destination ID
                </p>

                <p className="text-sm font-semibold text-[#302e29]">
                  #{id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ================= BASIC INFORMATION ================= */}
          <section className="group overflow-hidden rounded-2xl border border-[#e9e4da] bg-white shadow-[0_6px_25px_rgba(60,50,30,0.04)] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[0_12px_35px_rgba(60,50,30,0.08)]">

            <div className="border-b border-[#eeeae2] bg-gradient-to-r from-white to-[#fffdf8] px-5 py-5 sm:px-6">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7e5] text-[#ad8030] shadow-sm">
                  <MapPin size={20} />
                </div>

                <div>
                  <h2 className="font-display text-lg font-semibold text-[#292722]">
                    Basic Information
                  </h2>

                  <p className="text-xs text-[#918c83]">
                    Main information about the destination
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Destination Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#393630]">
                    Destination Name
                    <span className="ml-1 text-[#b48735]">*</span>
                  </label>

                  <input
                    className="w-full rounded-xl border border-[#e6e1d7] bg-[#fafaf8] px-4 py-3 text-sm text-[#302e2a] outline-none transition-all duration-300 placeholder:text-[#aaa59d] hover:border-[#d2c4a5] hover:bg-white focus:border-[#c29a4b] focus:bg-white focus:ring-4 focus:ring-[#c29a4b]/10"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Enter destination name"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#393630]">
                    Slug
                    <span className="ml-1 text-[#b48735]">*</span>
                  </label>

                  <input
                    className="w-full rounded-xl border border-[#e6e1d7] bg-[#fafaf8] px-4 py-3 text-sm text-[#302e2a] outline-none transition-all duration-300 placeholder:text-[#aaa59d] hover:border-[#d2c4a5] hover:bg-white focus:border-[#c29a4b] focus:bg-white focus:ring-4 focus:ring-[#c29a4b]/10"
                    value={form.slug}
                    onChange={(e) => update("slug", e.target.value)}
                    placeholder="destination-slug"
                  />

                  <p className="text-[11px] text-[#9a958c]">
                    URL-friendly identifier for this destination.
                  </p>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#393630]">
                    Category
                    <span className="ml-1 text-[#b48735]">*</span>
                  </label>

                  <select
                    className="w-full cursor-pointer appearance-none rounded-xl border border-[#e6e1d7] bg-[#fafaf8] px-4 py-3 text-sm text-[#302e2a] outline-none transition-all duration-300 hover:border-[#d2c4a5] hover:bg-white focus:border-[#c29a4b] focus:bg-white focus:ring-4 focus:ring-[#c29a4b]/10"
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#393630]">
                    Location
                    <span className="ml-1 text-[#b48735]">*</span>
                  </label>

                  <div className="relative">
                    <MapPin
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa197]"
                    />

                    <input
                      className="w-full rounded-xl border border-[#e6e1d7] bg-[#fafaf8] py-3 pl-11 pr-4 text-sm text-[#302e2a] outline-none transition-all duration-300 placeholder:text-[#aaa59d] hover:border-[#d2c4a5] hover:bg-white focus:border-[#c29a4b] focus:bg-white focus:ring-4 focus:ring-[#c29a4b]/10"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= DESCRIPTION ================= */}
          <section className="group overflow-hidden rounded-2xl border border-[#e9e4da] bg-white shadow-[0_6px_25px_rgba(60,50,30,0.04)] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[0_12px_35px_rgba(60,50,30,0.08)]">

            <div className="border-b border-[#eeeae2] bg-gradient-to-r from-white to-[#fffdf8] px-5 py-5 sm:px-6">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7e5] text-[#ad8030]">
                  <FileText size={20} />
                </div>

                <div>
                  <h2 className="font-display text-lg font-semibold text-[#292722]">
                    Destination Description
                  </h2>

                  <p className="text-xs text-[#918c83]">
                    Add meaningful information for visitors
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5 sm:p-6">

              {/* Short Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-[#393630]">
                    Short Description
                  </label>

                  <span className="text-[11px] text-[#aaa39a]">
                    {form.shortDescription.length}/160
                  </span>
                </div>

                <textarea
                  rows={3}
                  maxLength={160}
                  className="w-full resize-none rounded-xl border border-[#e6e1d7] bg-[#fafaf8] px-4 py-3 text-sm leading-6 text-[#302e2a] outline-none transition-all duration-300 placeholder:text-[#aaa59d] hover:border-[#d2c4a5] hover:bg-white focus:border-[#c29a4b] focus:bg-white focus:ring-4 focus:ring-[#c29a4b]/10"
                  value={form.shortDescription}
                  onChange={(e) =>
                    update("shortDescription", e.target.value)
                  }
                  placeholder="Write a short description..."
                />
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-[#393630]">
                    Full Description
                  </label>

                  <span className="text-[11px] text-[#aaa39a]">
                    Detailed information
                  </span>
                </div>

                <textarea
                  rows={6}
                  className="w-full resize-none rounded-xl border border-[#e6e1d7] bg-[#fafaf8] px-4 py-3 text-sm leading-6 text-[#302e2a] outline-none transition-all duration-300 placeholder:text-[#aaa59d] hover:border-[#d2c4a5] hover:bg-white focus:border-[#c29a4b] focus:bg-white focus:ring-4 focus:ring-[#c29a4b]/10"
                  value={form.fullDescription}
                  onChange={(e) =>
                    update("fullDescription", e.target.value)
                  }
                  placeholder="Write the complete destination description..."
                />
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-[#393630]">
                    Highlights
                  </label>

                  <span className="text-[11px] text-[#aaa39a]">
                    One highlight per line
                  </span>
                </div>

                <textarea
                  rows={4}
                  className="w-full resize-none rounded-xl border border-[#e6e1d7] bg-[#fafaf8] px-4 py-3 text-sm leading-6 text-[#302e2a] outline-none transition-all duration-300 placeholder:text-[#aaa59d] hover:border-[#d2c4a5] hover:bg-white focus:border-[#c29a4b] focus:bg-white focus:ring-4 focus:ring-[#c29a4b]/10"
                  value={form.highlights}
                  onChange={(e) => update("highlights", e.target.value)}
                  placeholder={"UNESCO World Heritage Site\nBeautiful architecture\nLocal cultural experience"}
                />
              </div>

              {/* Best Time */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#393630]">
                  Best Time to Visit
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa197]"
                  />

                  <input
                    className="w-full rounded-xl border border-[#e6e1d7] bg-[#fafaf8] py-3 pl-11 pr-4 text-sm text-[#302e2a] outline-none transition-all duration-300 placeholder:text-[#aaa59d] hover:border-[#d2c4a5] hover:bg-white focus:border-[#c29a4b] focus:bg-white focus:ring-4 focus:ring-[#c29a4b]/10"
                    value={form.bestTime}
                    onChange={(e) => update("bestTime", e.target.value)}
                    placeholder="Example: October to March"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ================= MEDIA ================= */}
          <section className="group overflow-hidden rounded-2xl border border-[#e9e4da] bg-white shadow-[0_6px_25px_rgba(60,50,30,0.04)] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[0_12px_35px_rgba(60,50,30,0.08)]">

            <div className="border-b border-[#eeeae2] bg-gradient-to-r from-white to-[#fffdf8] px-5 py-5 sm:px-6">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7e5] text-[#ad8030]">
                  <ImageIcon size={20} />
                </div>

                <div>
                  <h2 className="font-display text-lg font-semibold text-[#292722]">
                    Destination Media
                  </h2>

                  <p className="text-xs text-[#918c83]">
                    Upload a beautiful hero image for this destination
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">

              <label
                htmlFor="heroImage"
                className="group/upload relative block cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-[#ddd5c7] bg-[#fbfaf7] transition-all duration-300 hover:border-[#c49a4b] hover:bg-[#fffaf0]"
              >

                {imagePreview ? (
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Hero preview"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/upload:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover/upload:opacity-100" />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeImage();
                      }}
                      className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#4a4741] shadow-lg transition-all hover:scale-110 hover:bg-white"
                    >
                      <X size={17} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#393630] opacity-0 shadow-lg transition-all duration-300 group-hover/upload:opacity-100">
                      Click to replace image
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[230px] flex-col items-center justify-center px-5 text-center">

                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#b48735] shadow-[0_8px_25px_rgba(80,60,20,0.08)] transition-all duration-300 group-hover/upload:scale-110 group-hover/upload:-translate-y-1">
                      <UploadCloud size={27} />
                    </div>

                    <p className="text-sm font-semibold text-[#393630]">
                      Upload Hero Image
                    </p>

                    <p className="mt-1 text-xs text-[#99938a]">
                      Click here to select a new destination image
                    </p>

                    <span className="mt-4 rounded-full bg-[#f3ead5] px-4 py-2 text-[11px] font-semibold text-[#9d742b]">
                      JPG, PNG or WEBP
                    </span>
                  </div>
                )}

                <input
                  id="heroImage"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {!imagePreview && (
                <div className="mt-3 flex items-center gap-2 text-xs text-[#99938a]">
                  <Eye size={14} />
                  Current hero image will remain unchanged if no new image is selected.
                </div>
              )}
            </div>
          </section>

          {/* ================= SETTINGS ================= */}
          <section className="group overflow-hidden rounded-2xl border border-[#e9e4da] bg-white shadow-[0_6px_25px_rgba(60,50,30,0.04)] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[0_12px_35px_rgba(60,50,30,0.08)]">

            <div className="border-b border-[#eeeae2] bg-gradient-to-r from-white to-[#fffdf8] px-5 py-5 sm:px-6">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7e5] text-[#ad8030]">
                  <Settings2 size={20} />
                </div>

                <div>
                  <h2 className="font-display text-lg font-semibold text-[#292722]">
                    Publishing Settings
                  </h2>

                  <p className="text-xs text-[#918c83]">
                    Control visibility and featured status
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6">

              {/* Featured */}
              <label className="group/toggle flex cursor-pointer items-center justify-between rounded-xl border border-[#ebe5d9] bg-[#fbfaf7] p-4 transition-all duration-300 hover:border-[#d8c39b] hover:bg-[#fffaf0]">

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3ead5] text-[#a97b2d]">
                    <Sparkles size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#37342f]">
                      Featured Destination
                    </p>

                    <p className="mt-0.5 text-xs text-[#99938a]">
                      Highlight this destination
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={form.featured}
                    onChange={(e) =>
                      update("featured", e.target.checked)
                    }
                  />

                  <div className="h-6 w-11 rounded-full bg-[#d9d5cc] transition-all duration-300 peer-checked:bg-[#b48735]" />

                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300 peer-checked:translate-x-5" />
                </div>
              </label>

              {/* Published */}
              <label className="group/toggle flex cursor-pointer items-center justify-between rounded-xl border border-[#ebe5d9] bg-[#fbfaf7] p-4 transition-all duration-300 hover:border-[#d8c39b] hover:bg-[#fffaf0]">

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3ead5] text-[#a97b2d]">
                    <CheckCircle2 size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#37342f]">
                      Published
                    </p>

                    <p className="mt-0.5 text-xs text-[#99938a]">
                      Make destination visible
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={form.published}
                    onChange={(e) =>
                      update("published", e.target.checked)
                    }
                  />

                  <div className="h-6 w-11 rounded-full bg-[#d9d5cc] transition-all duration-300 peer-checked:bg-[#b48735]" />

                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-300 peer-checked:translate-x-5" />
                </div>
              </label>
            </div>
          </section>

          {/* ================= ACTION BAR ================= */}
          <div className="sticky bottom-4 z-20">

            <div className="flex flex-col gap-4 rounded-2xl border border-[#e4ded2] bg-white/95 p-4 shadow-[0_15px_45px_rgba(40,35,25,0.12)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-5">

              <div>
                <p className="text-sm font-semibold text-[#34312c]">
                  Ready to save changes?
                </p>

                <p className="mt-0.5 text-xs text-[#99938a]">
                  Your destination information will be updated.
                </p>
              </div>

              <div className="flex gap-3">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/destinations")}
                  className="min-w-[100px] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="gold"
                  disabled={submitting}
                  className="min-w-[170px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Updating...
                    </span>
                  ) : (
                    "Update Destination"
                  )}
                </Button>

              </div>
            </div>
          </div>

        </form>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
