import React, { useEffect, useState } from "react";
import {
  Download,
  Eye,
  FileVideo,
  Film,
  FolderOpen,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";

import {
  getAllVideos,
  getVideosByCity,
  getVideoById,
  uploadVideo,
  updateVideo,
  deleteVideo,
} from "../../api/videosApi";

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
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const EMPTY_FORM = {
  cityName: "",
  videoName: "",
  video: null,
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

function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
    >
      <span>{message}</span>
    </motion.div>
  );
}

function LoadingState({ text = "Loading..." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[280px] items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-xl">
          <div className="absolute inset-1 animate-spin rounded-xl border-2 border-transparent border-t-gold" />
          <Film size={23} className="text-gold" />
        </div>

        <p className="text-sm font-medium text-muted">{text}</p>
      </div>
    </motion.div>
  );
}

function SummaryCards({ items }) {
  const totalCities = new Set(
    items
      .map((item) => item.cityName?.trim())
      .filter(Boolean)
  ).size;

  const cards = [
    {
      label: "Total Videos",
      value: items.length,
      icon: Film,
    },
    {
      label: "Destinations",
      value: totalCities,
      icon: FolderOpen,
    },
    {
      label: "Cloud Videos",
      value: items.filter((item) => item.videoUrl).length,
      icon: FileVideo,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.label}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-sm transition hover:shadow-xl"
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold/5 transition duration-500 group-hover:scale-150" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  {card.label}
                </p>

                <p className="mt-3 font-display text-3xl font-semibold text-ink">
                  {card.value}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-gold shadow-lg">
                <Icon size={19} />
              </div>
            </div>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-surface">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, 45 + index * 20)}%`,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                }}
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
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black text-gold shadow-md">
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <h2 className="font-display text-lg font-semibold text-ink">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm leading-6 text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function ModalHeader({ title, subtitle, onClose, disabled = false }) {
  return (
    <div className="relative shrink-0 overflow-hidden rounded-t-[1.75rem] bg-black px-6 py-5 text-white sm:px-7 sm:py-6">
      <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative flex items-start justify-between gap-5">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold">
            <Film size={13} />
            Gallery
          </div>

          <h2 className="truncate font-display text-2xl font-semibold sm:text-3xl">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-white/50">
              {subtitle}
            </p>
          )}
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-muted">
        {label}
      </label>

      <input
        type="text"
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition duration-200 placeholder:text-muted/60 focus:border-gold focus:ring-4 focus:ring-gold/10"
      />
    </div>
  );
}

function VideoPreview({ file }) {
  if (!file) return null;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface/50 p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-gold">
        <FileVideo size={17} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-ink">
          {file.name}
        </p>

        <p className="mt-0.5 text-xs text-muted">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
    </div>
  );
}

function AddVideoModal({
  show,
  setShow,
  form,
  setForm,
  submitting,
  onSubmit,
}) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) {
          setShow(false);
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-2xl"
      >
        <ModalHeader
          title="Upload Video"
          subtitle="Add a destination video to the gallery."
          onClose={() => setShow(false)}
          disabled={submitting}
        />

        <form
          onSubmit={onSubmit}
          className="min-h-0 space-y-5 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:p-6"
        >
          <div className="rounded-[1.5rem] border border-line bg-white shadow-sm">
            <div className="border-b border-line bg-surface/40 p-4 sm:p-5">
              <SectionHeader
                icon={Film}
                title="Video Information"
                description="Add the destination and video details."
              />
            </div>

            <div className="grid gap-4 p-4 sm:p-5">
              <FormInput
                label="City Name"
                required
                placeholder="Ujjain"
                value={form.cityName}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    cityName: event.target.value,
                  }))
                }
              />

              <FormInput
                label="Video Name"
                required
                placeholder="Ujjain Aarti Video"
                value={form.videoName}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    videoName: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4">
              <SectionHeader
                icon={UploadCloud}
                title="Video File"
                description="Select a video file to upload."
              />
            </div>

            <label className="group mx-auto flex h-[165px] w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface/50 text-center transition hover:border-gold hover:bg-gold/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-gold shadow-lg">
                <Plus size={21} />
              </div>

              <p className="mt-3 text-sm font-semibold text-ink">
                Choose video
              </p>

              <p className="mt-1 text-xs text-muted">
                Select MP4 or another supported video file
              </p>

              <input
                id="gallery-video-upload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    video: event.target.files?.[0] || null,
                  }))
                }
              />
            </label>

            {form.video && (
              <div className="mt-4">
                <VideoPreview file={form.video} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={submitting}
              onClick={() => setShow(false)}
              className="rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-muted transition hover:border-ink hover:text-ink disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-gold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UploadCloud size={17} />
              {submitting ? "Uploading..." : "Upload Video"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function ViewVideoModal({
  show,
  selected,
  setShow,
  onEdit,
}) {
  if (!show || !selected) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setShow(false);
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-2xl"
      >
        <ModalHeader
          title={selected.videoName || "Video Details"}
          subtitle={selected.cityName || "Destination Video"}
          onClose={() => setShow(false)}
        />

        <div className="min-h-0 space-y-5 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:p-6">
          <div className="overflow-hidden rounded-[1.5rem] bg-black shadow-lg">
            <video
              src={selected.videoUrl}
              controls
              playsInline
              className="max-h-[480px] w-full"
            />
          </div>

          <div className="rounded-[1.5rem] border border-line bg-white shadow-sm">
            <div className="border-b border-line bg-surface/40 p-4 sm:p-5">
              <SectionHeader
                icon={FileText}
                title="Video Information"
                description="Details of the selected gallery video."
              />
            </div>

            <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                  City
                </p>

                <p className="mt-2 text-sm font-semibold text-ink">
                  {selected.cityName || "—"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                  Video Name
                </p>

                <p className="mt-2 text-sm font-semibold text-ink">
                  {selected.videoName || "—"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                  Created
                </p>

                <p className="mt-2 text-sm text-ink">
                  {selected.createdAt
                    ? new Date(selected.createdAt).toLocaleString(
                        "en-IN"
                      )
                    : "—"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                  Updated
                </p>

                <p className="mt-2 text-sm text-ink">
                  {selected.updatedAt
                    ? new Date(selected.updatedAt).toLocaleString(
                        "en-IN"
                      )
                    : "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4">
              <SectionHeader
                icon={Download}
                title="Video URL"
                description="Cloudinary source URL for this video."
              />
            </div>

            <a
              href={selected.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="block break-all rounded-2xl bg-surface p-4 text-sm text-gold-hover transition hover:bg-gold/5 hover:underline"
            >
              {selected.videoUrl || "No video URL available."}
            </a>
          </div>

          <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-muted transition hover:border-ink hover:text-ink"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => onEdit(selected)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-gold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Pencil size={16} />
              Edit Video
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function EditVideoModal({
  show,
  selected,
  setShow,
  form,
  setForm,
  submitting,
  onSubmit,
}) {
  if (!show || !selected) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) {
          setShow(false);
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-2xl"
      >
        <ModalHeader
          title="Edit Video"
          subtitle="Update destination video information."
          onClose={() => setShow(false)}
          disabled={submitting}
        />

        <form
          onSubmit={onSubmit}
          className="space-y-5 overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:p-6"
        >
          <div className="rounded-[1.5rem] border border-line bg-white shadow-sm">
            <div className="border-b border-line bg-surface/40 p-4 sm:p-5">
              <SectionHeader
                icon={Pencil}
                title="Video Details"
                description="Update the city and video name."
              />
            </div>

            <div className="grid gap-4 p-4 sm:p-5">
              <FormInput
                label="City Name"
                required
                value={form.cityName}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    cityName: event.target.value,
                  }))
                }
              />

              <FormInput
                label="Video Name"
                required
                value={form.videoName}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    videoName: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={submitting}
              onClick={() => setShow(false)}
              className="rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-muted transition hover:border-ink hover:text-ink disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-gold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Pencil size={16} />
              {submitting ? "Updating..." : "Update Video"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    ...EMPTY_FORM,
  });

  const [editForm, setEditForm] = useState({
    cityName: "",
    videoName: "",
  });

  const loadItems = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getAllVideos();

      if (result?.success) {
        setItems(
          Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.data?.data)
            ? result.data.data
            : []
        );
      } else {
        setItems([]);
        setError(result?.message || "Failed to load videos.");
      }
    } catch (error) {
      console.error("Failed to load videos:", error);

      setItems([]);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load videos."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSearch = async () => {
    const value = search.trim();

    if (!value) {
      loadItems();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await getVideosByCity(value);

      if (result?.success) {
        setItems(
          Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.data?.data)
            ? result.data.data
            : []
        );
      } else {
        setItems([]);
        setError(result?.message || "No videos found.");
      }
    } catch (error) {
      setItems([]);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to search videos."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearch("");
    loadItems();
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!form.cityName.trim()) {
      setError("Please enter city name.");
      return;
    }

    if (!form.videoName.trim()) {
      setError("Please enter video name.");
      return;
    }

    if (!form.video) {
      setError("Please select a video file.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setMessage("");

      const formData = new FormData();

      formData.append("cityName", form.cityName.trim());
      formData.append("videoName", form.videoName.trim());
      formData.append("video", form.video);

      const result = await uploadVideo(formData);

      if (result?.success) {
        setShowAdd(false);

        setForm({
          ...EMPTY_FORM,
        });

        setMessage(
          result.message || "Video uploaded successfully."
        );

        await loadItems();
      } else {
        setError(
          result?.message || "Unable to upload video."
        );
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleView = async (id) => {
    try {
      setError("");

      const result = await getVideoById(id);

      if (result?.success) {
        setSelected(result.data);
        setShowView(true);
      } else {
        setError(
          result?.message || "Unable to fetch video details."
        );
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to fetch video details."
      );
    }
  };

  const openEdit = (video) => {
    setSelected(video);

    setEditForm({
      cityName: video.cityName || "",
      videoName: video.videoName || "",
    });

    setShowView(false);
    setShowEdit(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!selected?._id) return;

    if (!editForm.cityName.trim()) {
      setError("Please enter city name.");
      return;
    }

    if (!editForm.videoName.trim()) {
      setError("Please enter video name.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setMessage("");

      const result = await updateVideo(selected._id, {
        cityName: editForm.cityName.trim(),
        videoName: editForm.videoName.trim(),
      });

      if (result?.success) {
        setItems((previous) =>
          previous.map((item) =>
            item._id === selected._id
              ? result.data
              : item
          )
        );

        setSelected(result.data);
        setShowEdit(false);

        setMessage(
          result.message || "Video updated successfully."
        );
      } else {
        setError(
          result?.message || "Unable to update video."
        );
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to update video."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;

    try {
      setDeleting(true);
      setError("");
      setMessage("");

      const result = await deleteVideo(deleteTarget._id);

      if (result?.success) {
        setItems((previous) =>
          previous.filter(
            (item) => item._id !== deleteTarget._id
          )
        );

        if (selected?._id === deleteTarget._id) {
          setSelected(null);
          setShowView(false);
          setShowEdit(false);
        }

        setDeleteTarget(null);

        setMessage(
          result.message || "Video deleted successfully."
        );
      } else {
        setError(
          result?.message || "Delete failed."
        );
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Delete failed."
      );
    } finally {
      setDeleting(false);
    }
  };

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
          className="relative overflow-hidden rounded-[2rem] bg-black p-6 text-white shadow-2xl sm:p-8"
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
                Gallery
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                Manage destination videos, uploads and gallery resources.
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setError("");
                setMessage("");
                setForm({
                  ...EMPTY_FORM,
                });
                setShowAdd(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-black shadow-lg transition hover:shadow-xl"
            >
              <Plus size={17} />
              Upload Video
            </motion.button>
          </div>
        </motion.div>

        <ErrorMessage error={error} />
        <SuccessMessage message={message} />

        <SummaryCards items={items} />

        <motion.div
          variants={itemVariants}
          className="rounded-[2rem] border border-line bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Destination Videos
              </h2>

              <p className="mt-1 text-sm text-muted">
                Browse and manage uploaded gallery videos.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search by city..."
                className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/10 sm:w-56"
              />

              <button
                type="button"
                onClick={handleSearch}
                className="rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-gold transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Search
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-muted transition hover:border-ink hover:text-ink"
              >
                Reset
              </button>
            </div>
          </div>

          {loading ? (
            <LoadingState text="Loading videos..." />
          ) : items.length === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-gold">
                  <FolderOpen size={28} />
                </div>

                <p className="mt-4 font-display text-lg font-semibold text-ink">
                  No videos found
                </p>

                <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-muted">
                  Upload a destination video to get started.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      ...EMPTY_FORM,
                    });
                    setShowAdd(true);
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-gold"
                >
                  <Plus size={14} />
                  Upload Video
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence initial={false}>
                {items.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.04,
                    }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-sm transition hover:shadow-xl"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <video
                        src={item.videoUrl}
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gold backdrop-blur-sm">
                        {item.cityName || "Unknown City"}
                      </span>

                      <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-gold backdrop-blur-md">
                        <Film size={16} />
                      </div>
                    </div>

                    <div className="relative p-5">
                      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold/5 transition duration-500 group-hover:scale-150" />

                      <div className="relative">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-gold shadow-md">
                            <FileVideo size={19} />
                          </div>

                          <span className="rounded-full bg-gold/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gold-hover">
                            Video
                          </span>
                        </div>

                        <h3 className="mt-5 line-clamp-1 font-display text-lg font-semibold text-ink">
                          {item.videoName || "Untitled Video"}
                        </h3>

                        <p className="mt-2 text-sm text-muted">
                          {item.cityName || "Unknown destination"}
                        </p>

                        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                          <div className="flex items-center gap-2 text-xs text-muted">
                            <FileVideo
                              size={14}
                              className="text-gold"
                            />

                            <span>Destination Video</span>
                          </div>

                          <span className="text-xs text-muted">
                            {formatDate(item.createdAt)}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleView(item._id)
                            }
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-black px-2 py-2.5 text-xs font-semibold text-gold transition hover:-translate-y-0.5 hover:shadow-lg"
                          >
                            <Eye size={14} />
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEdit(item)
                            }
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-2 py-2.5 text-xs font-semibold text-muted transition hover:border-gold hover:bg-gold/5 hover:text-gold-hover"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget(item)
                            }
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-danger/20 bg-danger/5 px-2 py-2.5 text-xs font-semibold text-danger transition hover:bg-danger/10"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </motion.div>

      <AddVideoModal
        show={showAdd}
        setShow={setShowAdd}
        form={form}
        setForm={setForm}
        submitting={submitting}
        onSubmit={handleCreate}
      />

      <ViewVideoModal
        show={showView}
        selected={selected}
        setShow={setShowView}
        onEdit={openEdit}
      />

      <EditVideoModal
        show={showEdit}
        selected={selected}
        setShow={setShowEdit}
        form={editForm}
        setForm={setEditForm}
        submitting={submitting}
        onSubmit={handleUpdate}
      />

      <DeleteModal
        open={!!deleteTarget}
        title="Delete Video"
        message={`Are you sure you want to delete "${
          deleteTarget?.videoName || "this video"
        }"? This action cannot be undone.`}
        onCancel={() => {
          if (!deleting) {
            setDeleteTarget(null);
          }
        }}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Gallery;