import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Eye,
  ImageOff,
  Map,
  MapPin,
  Pencil,
  Plane,
  Plus,
  Search,
  Save,
  Trash2,
  Train,
  Car,
  X,
  Sparkles,
  Images,
  Navigation,
  RefreshCw,
} from "lucide-react";

import Button from "../../components/Button/Button.jsx";
import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";

import {
  createDestination,
  getAllDestinations,
  getDestinationSummary,
  getDestinationNames,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from "../../api/destinationApi.js";

const EMPTY_FORM = {
  name: "",
  tagline: "",
  description: "",
  images: [],
  mapImage: "",
  highlights: [],
  weatherAndSeasonality: "",
  nearestAirport: "",
  nearestRailhead: "",
  roadConnectivity: "",
  canBeCombinedWith: [],
};

const STEPS = [
  {
    id: 1,
    title: "Basic",
    description: "Main details",
  },
  {
    id: 2,
    title: "Content",
    description: "Images & highlights",
  },
  {
    id: 3,
    title: "Travel",
    description: "Travel information",
  },
];

const normalizeArray = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (!value) {
    return [];
  }

  return String(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeDestination = (data) => {
  const destination = data || {};
  const travel = destination.essentialTravelInfo || {};

  return {
    name: destination.name || "",
    tagline: destination.tagline || "",
    description: destination.description || "",
    images: normalizeArray(destination.images),
    mapImage: destination.mapImage || "",
    highlights: normalizeArray(destination.highlights),
    weatherAndSeasonality: travel.weatherAndSeasonality || "",
    nearestAirport: travel.nearestAirport || "",
    nearestRailhead: travel.nearestRailhead || "",
    roadConnectivity: travel.roadConnectivity || "",
    canBeCombinedWith: normalizeArray(travel.canBeCombinedWith),
  };
};

const buildPayload = (form) => ({
  name: form.name.trim(),
  tagline: form.tagline.trim(),
  description: form.description.trim(),
  images: form.images.map((image) => image.trim()).filter(Boolean),
  mapImage: form.mapImage.trim(),
  highlights: form.highlights.map((highlight) => highlight.trim()).filter(Boolean),
  essentialTravelInfo: {
    weatherAndSeasonality: form.weatherAndSeasonality.trim(),
    nearestAirport: form.nearestAirport.trim(),
    nearestRailhead: form.nearestRailhead.trim(),
    roadConnectivity: form.roadConnectivity.trim(),
    canBeCombinedWith: form.canBeCombinedWith
      .map((place) => place.trim())
      .filter(Boolean),
  },
});

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getResponseData = (response) => {
  if (response?.data !== undefined) {
    return response.data;
  }

  return response;
};

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: "easeOut",
    },
  },
};

function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 rounded-2xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger"
    >
      <X size={17} className="mt-0.5 shrink-0" />
      <span>{error}</span>
    </motion.div>
  );
}

function LoadingState({ text = "Loading..." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[350px] items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
          <div className="absolute inset-1 animate-spin rounded-xl border-2 border-transparent border-t-gold" />
          <MapPin size={22} className="text-gold" />
        </div>
        <p className="text-sm font-medium text-muted">{text}</p>
      </div>
    </motion.div>
  );
}

function SummaryCards({ summary, destinations }) {
  const apiValues =
    summary && typeof summary === "object"
      ? Object.entries(summary).filter(
          ([, value]) =>
            typeof value === "number" || typeof value === "string"
        )
      : [];

  const fallbackCards = [
    {
      label: "Total Destinations",
      value: destinations.length,
      icon: MapPin,
    },
    {
      label: "With Images",
      value: destinations.filter((item) => item?.images?.length).length,
      icon: Images,
    },
    {
      label: "With Highlights",
      value: destinations.filter((item) => item?.highlights?.length).length,
      icon: Sparkles,
    },
    {
      label: "Travel Info",
      value: destinations.filter((item) => item?.essentialTravelInfo).length,
      icon: Navigation,
    },
  ];

  const cards = apiValues.length
    ? apiValues.slice(0, 4).map(([key, value], index) => ({
        label: key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (letter) => letter.toUpperCase()),
        value,
        icon: [MapPin, Sparkles, Navigation, Images][index] || MapPin,
      }))
    : fallbackCards;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={`${card.label}-${index}`}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5"
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold/5 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                  {card.label}
                </p>

                <p className="mt-3 font-display text-3xl font-semibold text-ink">
                  {card.value}
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-gold shadow-sm transition-transform duration-300 group-hover:rotate-3">
                <Icon size={19} />
              </div>
            </div>

            <div className="relative mt-5 h-1 overflow-hidden rounded-full bg-surface">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, 35 + index * 16)}%` }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                className="h-full rounded-full bg-gold"
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-gold">
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <h2 className="font-display text-lg font-semibold text-ink">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
        )}
      </div>
    </div>
  );
}

function StepHeader({ icon: Icon, title, description }) {
  return (
    <div className="mb-6 flex items-start gap-4 rounded-2xl bg-surface/70 p-4 sm:p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-gold">
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <h3 className="font-display text-lg font-semibold text-ink">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
      </div>
    </div>
  );
}

function Stepper({ currentStep, onStepChange }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {STEPS.map((step) => {
        const active = currentStep === step.id;
        const completed = currentStep > step.id;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => {
              if (completed || active) {
                onStepChange(step.id);
              }
            }}
            className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
              active
                ? "border-gold bg-gold/10"
                : completed
                ? "border-gold/20 bg-gold/5"
                : "border-line bg-white"
            }`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                active || completed
                  ? "bg-black text-gold"
                  : "bg-surface text-muted"
              }`}
            >
              {completed ? "✓" : step.id}
            </span>

            <span className="min-w-0">
              <span
                className={`block text-sm font-semibold ${
                  active ? "text-ink" : "text-muted"
                }`}
              >
                {step.title}
              </span>
              <span className="block truncate text-[11px] text-muted">
                {step.description}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ModalShell({
  title,
  subtitle,
  mode,
  children,
  footer,
  currentStep,
  onStepChange,
  onClose,
}) {
  const isWizard = mode === "add" || mode === "edit";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 14 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="relative flex w-full max-w-[820px] max-h-[calc(100vh-24px)] flex-col overflow-hidden rounded-[26px] border border-white/20 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.5)] sm:max-h-[calc(100vh-40px)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="shrink-0 bg-black px-5 py-5 text-white sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                {mode === "view" ? <Eye size={20} /> : <Plus size={21} />}
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                  Destination Management
                </p>

                <h2 className="mt-1 truncate font-display text-xl font-semibold sm:text-2xl">
                  {title}
                </h2>

                <p className="mt-1 text-xs leading-5 text-white/55 sm:text-sm">
                  {subtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:border-gold/30 hover:bg-gold/10 hover:text-gold"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {isWizard && (
          <div className="shrink-0 border-b border-line bg-white px-4 py-3 sm:px-5">
            <Stepper
              currentStep={currentStep}
              onStepChange={onStepChange}
            />
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto bg-white">
          <div className="p-4 sm:p-6">{children}</div>
        </div>

        {footer && (
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line bg-white px-4 py-3 sm:px-5">
            {footer}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function DestinationWizard({
  mode,
  form,
  setForm,
  submitting,
  error,
  onSubmit,
  onClose,
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const update = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const updateTextArray = (key, value) => {
    update(
      key,
      value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    );
  };

  const addImage = () => {
    setForm((previous) => ({
      ...previous,
      images: [...previous.images, ""],
    }));
  };

  const updateImage = (index, value) => {
    setForm((previous) => ({
      ...previous,
      images: previous.images.map((image, imageIndex) =>
        imageIndex === index ? value : image
      ),
    }));
  };

  const removeImage = (index) => {
    setForm((previous) => ({
      ...previous,
      images: previous.images.filter(
        (_, imageIndex) => imageIndex !== index
      ),
    }));
  };

  const validateStep = () => {
    if (currentStep === 1 && !form.name.trim()) {
      return "Destination name is required.";
    }

    return "";
  };

  const goNext = () => {
    const validationError = validateStep();

    if (validationError) {
      return;
    }

    setCurrentStep((step) => Math.min(3, step + 1));
  };

  const goBack = () => {
    if (currentStep === 1) {
      onClose();
      return;
    }

    setCurrentStep((step) => Math.max(1, step - 1));
  };

  return (
    <ModalShell
      mode={mode}
      title={mode === "edit" ? "Edit Destination" : "Create Destination"}
      subtitle="Complete the destination profile in three simple steps."
      currentStep={currentStep}
      onStepChange={setCurrentStep}
      onClose={onClose}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            disabled={submitting}
          >
            <ArrowLeft size={16} />
            {currentStep === 1 ? "Close" : "Back"}
          </Button>

          {currentStep < 3 ? (
            <Button
              type="button"
              variant="gold"
              onClick={goNext}
              disabled={submitting}
            >
              Continue
              <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              type="button"
              variant="gold"
              icon={Save}
              onClick={onSubmit}
              disabled={submitting}
            >
              {submitting
                ? "Saving..."
                : mode === "edit"
                ? "Update Destination"
                : "Save Destination"}
            </Button>
          )}
        </>
      }
    >
      <ErrorMessage error={error} />

      <div className="mt-4">
        {currentStep === 1 && (
          <motion.div
            key="basic"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            <StepHeader
              icon={MapPin}
              title="Basic Information"
              description="Add the main destination information."
            />

            <div className="space-y-5">
              <div>
                <label className="label-field">Destination Name</label>
                <input
                  className="input-field"
                  value={form.name}
                  onChange={(event) =>
                    update("name", event.target.value)
                  }
                  placeholder="Gulmarg"
                  required
                />
              </div>

              <div>
                <label className="label-field">Tagline</label>
                <input
                  className="input-field"
                  value={form.tagline}
                  onChange={(event) =>
                    update("tagline", event.target.value)
                  }
                  placeholder="The Meadow of Flowers & Skiing Paradise"
                />
              </div>

              <div>
                <label className="label-field">Description</label>
                <textarea
                  rows={7}
                  className="input-field resize-y"
                  value={form.description}
                  onChange={(event) =>
                    update("description", event.target.value)
                  }
                  placeholder="Describe this destination..."
                />
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <StepHeader
              icon={Images}
              title="Content & Gallery"
              description="Add destination images, map information and highlights."
            />

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <label className="label-field mb-0">Destination Images</label>
                  <p className="mt-1 text-xs text-muted">
                    Add one image URL per field.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  icon={Plus}
                  onClick={addImage}
                >
                  Add Image
                </Button>
              </div>

              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {form.images.map((image, index) => (
                    <motion.div
                      key={`${index}-${image}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-2 overflow-hidden"
                    >
                      <input
                        className="input-field min-w-0 flex-1"
                        value={image}
                        onChange={(event) =>
                          updateImage(index, event.target.value)
                        }
                        placeholder="https://example.com/image.jpg"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line text-danger transition hover:border-danger/20 hover:bg-danger/5"
                      >
                        <X size={17} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {!form.images.length && (
                  <div className="rounded-2xl border border-dashed border-line bg-surface/50 p-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-black text-gold">
                      <ImageOff size={21} />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-ink">
                      No images added
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      Add image URLs using the button above.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="label-field">Map Image URL</label>
              <input
                className="input-field"
                value={form.mapImage}
                onChange={(event) =>
                  update("mapImage", event.target.value)
                }
                placeholder="https://example.com/map.jpg"
              />
            </div>

            <div>
              <label className="label-field">Highlights</label>
              <textarea
                rows={7}
                className="input-field resize-y"
                value={form.highlights.join("\n")}
                onChange={(event) =>
                  updateTextArray("highlights", event.target.value)
                }
                placeholder={"Gulmarg Gondola Ride\nGolf Course\nApharwat Peak"}
              />
              <p className="mt-2 text-xs text-muted">
                Add one highlight per line.
              </p>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="travel"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <StepHeader
              icon={Navigation}
              title="Essential Travel Information"
              description="Add practical travel information visitors can use."
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="label-field">
                  Weather & Seasonality
                </label>
                <input
                  className="input-field"
                  value={form.weatherAndSeasonality}
                  onChange={(event) =>
                    update(
                      "weatherAndSeasonality",
                      event.target.value
                    )
                  }
                  placeholder="Snowy in winter, cool in summer"
                />
              </div>

              <div>
                <label className="label-field">Nearest Airport</label>
                <input
                  className="input-field"
                  value={form.nearestAirport}
                  onChange={(event) =>
                    update("nearestAirport", event.target.value)
                  }
                  placeholder="Srinagar Airport (SXR) - 56 km"
                />
              </div>

              <div>
                <label className="label-field">Nearest Railhead</label>
                <input
                  className="input-field"
                  value={form.nearestRailhead}
                  onChange={(event) =>
                    update("nearestRailhead", event.target.value)
                  }
                  placeholder="Jammu Tawi - 290 km"
                />
              </div>

              <div>
                <label className="label-field">Road Connectivity</label>
                <input
                  className="input-field"
                  value={form.roadConnectivity}
                  onChange={(event) =>
                    update("roadConnectivity", event.target.value)
                  }
                  placeholder="Well connected by NH1 & Tangmarg road"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label-field">
                  Can Be Combined With
                </label>
                <textarea
                  rows={5}
                  className="input-field resize-y"
                  value={form.canBeCombinedWith.join("\n")}
                  onChange={(event) =>
                    updateTextArray(
                      "canBeCombinedWith",
                      event.target.value
                    )
                  }
                  placeholder={"Srinagar\nPahalgam"}
                />
                <p className="mt-2 text-xs text-muted">
                  Add one destination per line.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </ModalShell>
  );
}

function ViewDestinationModal({ destination, onClose, onEdit }) {
  const data = normalizeDestination(destination);

  return (
    <ModalShell
      mode="view"
      title={data.name || "Destination"}
      subtitle={data.tagline || "Destination details"}
      onClose={onClose}
      footer={
        <>
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>

          <Button
            type="button"
            variant="gold"
            icon={Pencil}
            onClick={onEdit}
          >
            Edit Destination
          </Button>
        </>
      }
    >
      <div className="space-y-7">
        <div className="overflow-hidden rounded-2xl border border-line bg-black">
          {data.images[0] ? (
            <img
              src={data.images[0]}
              alt={data.name}
              className="h-[220px] w-full object-cover sm:h-[270px]"
            />
          ) : (
            <div className="flex h-[220px] items-center justify-center text-white/40 sm:h-[270px]">
              <div className="text-center">
                <ImageOff size={36} className="mx-auto" />
                <p className="mt-2 text-sm">No destination image</p>
              </div>
            </div>
          )}
        </div>

        {data.description && (
          <section>
            <h3 className="mb-2 font-display text-lg font-semibold text-ink">
              About this destination
            </h3>
            <p className="text-sm leading-7 text-ink/75">
              {data.description}
            </p>
          </section>
        )}

        {data.highlights.length > 0 && (
          <section>
            <h3 className="mb-4 font-display text-lg font-semibold text-ink">
              Highlights
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {data.highlights.map((highlight, index) => (
                <div
                  key={`${highlight}-${index}`}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                    <CheckCircle2 size={17} className="text-gold" />
                  </div>

                  <span className="pt-1 text-sm leading-6 text-ink">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="mb-4 font-display text-lg font-semibold text-ink">
            Essential Travel Information
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TravelCard
              icon={CloudSun}
              title="Weather & Seasonality"
              value={data.weatherAndSeasonality}
            />

            <TravelCard
              icon={Plane}
              title="Nearest Airport"
              value={data.nearestAirport}
            />

            <TravelCard
              icon={Train}
              title="Nearest Railhead"
              value={data.nearestRailhead}
            />

            <TravelCard
              icon={Car}
              title="Road Connectivity"
              value={data.roadConnectivity}
            />
          </div>
        </section>

        {data.canBeCombinedWith.length > 0 && (
          <section>
            <h3 className="mb-4 font-display text-lg font-semibold text-ink">
              Can Be Combined With
            </h3>

            <div className="flex flex-wrap gap-2">
              {data.canBeCombinedWith.map((place, index) => (
                <span
                  key={`${place}-${index}`}
                  className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-sm font-medium text-gold-hover"
                >
                  {place}
                </span>
              ))}
            </div>
          </section>
        )}

        {data.images.length > 1 && (
          <section>
            <h3 className="mb-4 font-display text-lg font-semibold text-ink">
              Gallery
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {data.images.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="group overflow-hidden rounded-2xl border border-line bg-surface"
                >
                  <img
                    src={image}
                    alt={`${data.name} ${index + 1}`}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {data.mapImage && (
          <section>
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-ink">
              <Map size={18} className="text-gold" />
              Destination Map
            </h3>

            <div className="overflow-hidden rounded-2xl border border-line bg-surface">
              <img
                src={data.mapImage}
                alt={`${data.name} map`}
                className="max-h-[350px] w-full object-cover"
              />
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 gap-3 border-t border-line pt-5 sm:grid-cols-2">
          <DateCard
            title="Created"
            value={formatDate(destination?.createdAt)}
          />

          <DateCard
            title="Last Updated"
            value={formatDate(destination?.updatedAt)}
          />
        </div>
      </div>
    </ModalShell>
  );
}

function TravelCard({ icon: Icon, title, value }) {
  return (
    <div className="rounded-2xl border border-line bg-surface/50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-gold">
          <Icon size={17} />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
            {title}
          </p>

          <p className="mt-2 break-words text-sm leading-6 text-ink">
            {value || "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
}

function DateCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-surface p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/10">
          <CalendarDays size={17} className="text-gold" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
            {title}
          </p>

          <p className="mt-1 text-sm font-semibold text-ink">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Destinations() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isAdd = location.pathname.endsWith("/add");
  const isView = location.pathname.includes("/view/");
  const isEdit = location.pathname.includes("/edit/");

  const [destinations, setDestinations] = useState([]);
  const [summary, setSummary] = useState(null);
  const [destinationNames, setDestinationNames] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [form, setForm] = useState({
    ...EMPTY_FORM,
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const pageSize = 8;

  const loadDestinations = async () => {
    try {
      setLoading(true);
      setError("");

      const [allResponse, summaryResponse, namesResponse] =
        await Promise.all([
          getAllDestinations(),
          getDestinationSummary(),
          getDestinationNames(),
        ]);

      const allData = getResponseData(allResponse);

      setDestinations(Array.isArray(allData) ? allData : []);

      const summaryData = getResponseData(summaryResponse);

      setSummary(
        summaryData && typeof summaryData === "object"
          ? summaryData
          : null
      );

      const namesData = getResponseData(namesResponse);

      setDestinationNames(
        Array.isArray(namesData) ? namesData : []
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load destinations."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadDestination = async (destinationId) => {
    try {
      setDetailLoading(true);
      setError("");

      const response = await getDestinationById(destinationId);
      const destination = getResponseData(response);

      setSelectedDestination(destination);
      setForm(normalizeDestination(destination));
    } catch (err) {
      setSelectedDestination(null);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load destination."
      );
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  useEffect(() => {
    if (isAdd) {
      setSelectedDestination(null);
      setForm({
        ...EMPTY_FORM,
        images: [],
        highlights: [],
        canBeCombinedWith: [],
      });
      setError("");
      setSubmitting(false);
      return;
    }

    if ((isView || isEdit) && id) {
      loadDestination(id);
    }

    if (!isView && !isEdit) {
      setSelectedDestination(null);
    }
  }, [isAdd, isView, isEdit, id]);

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return destinations;
    }

    return destinations.filter((destination) => {
      const name = destination?.name?.toLowerCase() || "";
      const tagline = destination?.tagline?.toLowerCase() || "";
      const description =
        destination?.description?.toLowerCase() || "";

      return (
        name.includes(query) ||
        tagline.includes(query) ||
        description.includes(query)
      );
    });
  }, [destinations, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDestinations.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const closeModal = () => {
    if (!submitting && !deleting) {
      navigate("/destinations");
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setError("Destination name is required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload = buildPayload(form);

      if (isEdit && id) {
        await updateDestination(id, payload);
      } else {
        await createDestination(payload);
      }

      await loadDestinations();
      navigate("/destinations");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to save destination."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteDestination(deleteTarget._id);

      setDeleteTarget(null);
      await loadDestinations();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete destination."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-3xl bg-black p-6 text-white shadow-xl sm:p-8"
        >
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold">
                <Sparkles size={13} />
                MP Escapes
              </div>

              <h1 className="font-display text-3xl font-semibold sm:text-4xl">
                Destinations
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                Manage your travel destinations, highlights,
                galleries and essential travel information.
              </p>
            </div>

            <Link to="/destinations/add">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button variant="gold" icon={Plus}>
                  Add Destination
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        <ErrorMessage error={error} />

        <SummaryCards
          summary={summary}
          destinations={destinations}
        />

        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-line bg-white p-4 shadow-sm"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="group relative w-full lg:max-w-xl">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted transition group-focus-within:text-gold"
              />

              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search destinations..."
                className="input-field pl-11 transition-all focus:border-gold focus:shadow-lg focus:shadow-gold/5"
              />

              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setPage(1);
                    }}
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-muted hover:bg-surface hover:text-ink"
                  >
                    <X size={15} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="rounded-full bg-surface px-3 py-2 font-medium">
                {destinations.length} destinations
              </span>

              {destinationNames.length > 0 && (
                <span className="rounded-full bg-gold/10 px-3 py-2 font-medium text-gold-hover">
                  {destinationNames.length} names
                </span>
              )}

              <button
                type="button"
                onClick={loadDestinations}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition hover:border-gold hover:text-gold"
                title="Refresh"
              >
                <RefreshCw
                  size={15}
                  className={loading ? "animate-spin" : ""}
                />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm"
        >
          {loading ? (
            <LoadingState text="Loading destinations..." />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1080px]">
                  <thead>
                    <tr className="border-b border-line bg-surface/50">
                      <th className="table-head">Image</th>
                      <th className="table-head">Destination</th>
                      <th className="table-head">Tagline</th>
                      <th className="table-head">Highlights</th>
                      <th className="table-head">Travel Information</th>
                      <th className="table-head">Updated</th>
                      <th className="table-head text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <AnimatePresence initial={false}>
                      {paginatedDestinations.map(
                        (destination, index) => {
                          const travel =
                            destination.essentialTravelInfo || {};

                          return (
                            <motion.tr
                              key={destination._id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.035,
                              }}
                              className="group border-b border-line/70 transition hover:bg-gold/[0.025]"
                            >
                              <td className="table-cell">
                                <div className="relative h-14 w-20 overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                                  {destination.images?.[0] ? (
                                    <img
                                      src={destination.images[0]}
                                      alt={destination.name}
                                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center text-muted">
                                      <ImageOff size={18} />
                                    </div>
                                  )}
                                </div>
                              </td>

                              <td className="table-cell">
                                <div className="max-w-[220px]">
                                  <p className="font-semibold text-ink">
                                    {destination.name ||
                                      "Unnamed Destination"}
                                  </p>

                                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">
                                    {destination.description ||
                                      "No description available"}
                                  </p>
                                </div>
                              </td>

                              <td className="table-cell">
                                <p className="max-w-[240px] line-clamp-2 text-sm leading-5 text-muted">
                                  {destination.tagline || "No tagline"}
                                </p>
                              </td>

                              <td className="table-cell">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-hover">
                                  <Sparkles size={12} />
                                  {destination.highlights?.length || 0} Highlights
                                </span>
                              </td>

                              <td className="table-cell">
                                <div className="max-w-[240px] space-y-2 text-xs text-muted">
                                  <p className="flex items-start gap-1.5">
                                    <Plane
                                      size={12}
                                      className="mt-0.5 shrink-0 text-gold"
                                    />
                                    <span className="line-clamp-1">
                                      {travel.nearestAirport ||
                                        "Airport unavailable"}
                                    </span>
                                  </p>

                                  <p className="flex items-start gap-1.5">
                                    <Train
                                      size={12}
                                      className="mt-0.5 shrink-0 text-gold"
                                    />
                                    <span className="line-clamp-1">
                                      {travel.nearestRailhead ||
                                        "Railhead unavailable"}
                                    </span>
                                  </p>
                                </div>
                              </td>

                              <td className="table-cell text-muted">
                                {formatDate(destination.updatedAt)}
                              </td>

                              <td className="table-cell">
                                <div className="flex items-center justify-end gap-1">
                                  <Link
                                    to={`/destinations/view/${destination._id}`}
                                    className="rounded-lg p-2 text-muted transition hover:bg-black hover:text-gold"
                                    title="View"
                                  >
                                    <Eye size={16} />
                                  </Link>

                                  <Link
                                    to={`/destinations/edit/${destination._id}`}
                                    className="rounded-lg p-2 text-muted transition hover:bg-gold/10 hover:text-gold-hover"
                                    title="Edit"
                                  >
                                    <Pencil size={16} />
                                  </Link>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setDeleteTarget(destination)
                                    }
                                    className="rounded-lg p-2 text-danger/70 transition hover:bg-danger/5 hover:text-danger"
                                    title="Delete"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          );
                        }
                      )}
                    </AnimatePresence>

                    {!paginatedDestinations.length && (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <td
                          colSpan={7}
                          className="px-4 py-20 text-center"
                        >
                          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-gold">
                            <MapPin size={28} />
                          </div>

                          <p className="mt-4 font-display text-lg font-semibold text-ink">
                            No destinations found
                          </p>

                          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-muted">
                            Try another search or create a new destination.
                          </p>

                          {search && (
                            <button
                              type="button"
                              onClick={() => {
                                setSearch("");
                                setPage(1);
                              }}
                              className="mt-4 text-xs font-semibold text-gold-hover hover:underline"
                            >
                              Clear search
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-3 border-t border-line bg-surface/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted">
                  Showing{" "}
                  {paginatedDestinations.length
                    ? (currentPage - 1) * pageSize + 1
                    : 0}
                  –
                  {Math.min(
                    currentPage * pageSize,
                    filteredDestinations.length
                  )}{" "}
                  of {filteredDestinations.length}
                </p>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setPage((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <span className="flex h-9 min-w-[70px] items-center justify-center rounded-lg bg-black px-3 text-xs font-semibold text-white">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setPage((current) =>
                        Math.min(totalPages, current + 1)
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>

      <DeleteModal
        open={!!deleteTarget}
        title="Delete destination"
        message={`Are you sure you want to delete "${
          deleteTarget?.name || "this destination"
        }"? This action cannot be undone.`}
        onCancel={() => {
          if (!deleting) {
            setDeleteTarget(null);
          }
        }}
        onConfirm={handleDelete}
      />

      <AnimatePresence>
        {(isAdd || isEdit) && (
          <>
            {isEdit && detailLoading ? (
              <motion.div
                className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-black/80 p-4 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-2xl bg-white px-8 py-7 shadow-2xl">
                  <LoadingState text="Loading destination..." />
                </div>
              </motion.div>
            ) : (
              <DestinationWizard
                mode={isEdit ? "edit" : "add"}
                form={form}
                setForm={setForm}
                submitting={submitting}
                error={error}
                onSubmit={handleSubmit}
                onClose={closeModal}
              />
            )}
          </>
        )}

        {isView && (
          <>
            {detailLoading ? (
              <motion.div
                className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-black/80 p-4 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-2xl bg-white px-8 py-7 shadow-2xl">
                  <LoadingState text="Loading destination..." />
                </div>
              </motion.div>
            ) : selectedDestination ? (
              <ViewDestinationModal
                destination={selectedDestination}
                onClose={closeModal}
                onEdit={() =>
                  navigate(
                    `/destinations/edit/${selectedDestination._id}`
                  )
                }
              />
            ) : null}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
