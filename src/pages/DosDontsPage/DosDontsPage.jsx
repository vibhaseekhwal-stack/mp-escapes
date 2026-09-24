import React, { useEffect, useState } from "react";
import {
  Download,
  Eye,
  FileArchive,
  FileText,
  FolderOpen,
  Image,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";

import {
  getAllDosDonts,
  getDosDontsById,
  createDosDonts,
  downloadDosDontsFile,
  downloadDosDontsZip,
  deleteDosDonts,
} from "../../api/dosDontsApi";

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
  title: "",
  description: "",
  files: [],
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
      className="flex min-h-[280px] items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-xl">
          <div className="absolute inset-1 animate-spin rounded-xl border-2 border-transparent border-t-gold" />
          <FileText size={23} className="text-gold" />
        </div>

        <p className="text-sm font-medium text-muted">{text}</p>
      </div>
    </motion.div>
  );
}

function SummaryCards({ items }) {
  const totalFiles = items.reduce(
    (total, item) =>
      total + (Array.isArray(item.files) ? item.files.length : 0),
    0
  );

  const cards = [
    {
      label: "Total Documents",
      value: items.length,
      icon: FileText,
    },
    {
      label: "Total Files",
      value: totalFiles,
      icon: FileArchive,
    },
    {
      label: "Documents With Files",
      value: items.filter(
        (item) => Array.isArray(item.files) && item.files.length > 0
      ).length,
      icon: Download,
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

function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-muted">
        {label}
      </label>

      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full resize-none rounded-2xl border border-line bg-white px-4 py-3 text-sm leading-6 text-ink outline-none transition duration-200 placeholder:text-muted/60 focus:border-gold focus:ring-4 focus:ring-gold/10"
      />
    </div>
  );
}

function FilePreview({ file }) {
  const extension = file?.name?.split(".").pop()?.toLowerCase();

  let Icon = FileText;

  if (["png", "jpg", "jpeg", "webp", "gif"].includes(extension)) {
    Icon = Image;
  }

  if (["zip", "rar"].includes(extension)) {
    Icon = FileArchive;
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface/50 p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-gold">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-ink">
          {file.name}
        </p>

        <p className="mt-0.5 text-xs text-muted">
          {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>
    </div>
  );
}

function ModalHeader({ title, onClose, disabled = false }) {
  return (
    <div className="relative shrink-0 overflow-hidden rounded-t-[1.75rem] bg-black px-6 py-5 text-white sm:px-7 sm:py-6">
      <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative flex items-start justify-between gap-5">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold">
            <FileText size={13} />
            Dos & Don'ts
          </div>

          <h2 className="truncate font-display text-2xl font-semibold sm:text-3xl">
            {title}
          </h2>
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

function AddDocumentModal({
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
          title="Add Dos & Don'ts"
          onClose={() => setShow(false)}
          disabled={submitting}
        />

        <form
  onSubmit={onSubmit}
  className="min-h-0 space-y-5 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-5 sm:p-6"
>
          <div className="rounded-[1.5rem] border border-line bg-white shadow-sm">
            <div className="border-b border-line bg-surface/40 p-4 sm:p-5">
              <SectionHeader
                icon={FileText}
                title="Document Information"
                description="Add the basic information for this guideline."
              />
            </div>

            <div className="grid gap-4 p-4 sm:p-5">
              <FormInput
                label="Title"
                required
                placeholder="Safari & Trekking Guidelines"
                value={form.title}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    title: event.target.value,
                  }))
                }
              />

              <FormTextarea
                label="Description"
                rows={4}
                placeholder="Enter safety norms, rules and guidelines..."
                value={form.description}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    description: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4">
              <SectionHeader
                icon={FileArchive}
                title="Documents"
                description="Upload one or more files for this guideline."
              />
            </div>

            <label className="group mx-auto flex h-[145px] w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface/50 text-center transition hover:border-gold hover:bg-gold/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-gold shadow-lg">
                <Plus size={21} />
              </div>

              <p className="mt-3 text-sm font-semibold text-ink">
                Choose documents
              </p>

              <p className="mt-1 text-xs text-muted">
                Select multiple files to upload
              </p>

              <input
                type="file"
                multiple
                className="hidden"
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    files: Array.from(event.target.files || []),
                  }))
                }
              />
            </label>

            {form.files.length > 0 && (
              <div className="mt-4 max-h-28 space-y-2 overflow-y-auto pr-1">
                {form.files.map((file) => (
                  <FilePreview
                    key={`${file.name}-${file.size}`}
                    file={file}
                  />
                ))}
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
              <Plus size={17} />
              {submitting ? "Uploading..." : "Create Document"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function ViewDocumentModal({
  show,
  selected,
  setShow,
  onFileDownload,
  onZipDownload,
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
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-2xl"
      >
        <ModalHeader
          title={selected.title || "Document Details"}
          onClose={() => setShow(false)}
        />

        <div className="min-h-0 space-y-5 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-5 sm:p-6">
          <div className="rounded-[1.5rem] border border-line bg-white shadow-sm">
            <div className="border-b border-line bg-surface/40 p-4 sm:p-5">
              <SectionHeader
                icon={FileText}
                title="Description"
                description="Document guideline information."
              />
            </div>

            <div className="p-4 sm:p-5">
              <p className="rounded-2xl bg-surface p-4 text-sm leading-7 text-ink/75">
                {selected.description || "No description available."}
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-line bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4">
              <SectionHeader
                icon={FileArchive}
                title={`Files (${selected.files?.length || 0})`}
                description="Download individual files or the complete ZIP."
              />
            </div>

            <div className="space-y-3">
              {selected.files?.length ? (
                selected.files.map((file) => (
                  <motion.div
                    key={file._id}
                    whileHover={{ y: -2 }}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface/50 p-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-gold">
                        <FileText size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">
                          {file.originalName || "Document"}
                        </p>

                        <p className="mt-1 text-xs uppercase text-muted">
                          {file.fileType || "file"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onFileDownload(selected, file)}
                      className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-black px-3 py-2 text-xs font-semibold text-gold transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <Download size={14} />

                      <span className="hidden sm:inline">
                        Download
                      </span>
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-line bg-surface/50 p-8 text-center">
                  <FileText size={28} className="mx-auto text-muted" />

                  <p className="mt-3 text-sm font-semibold text-ink">
                    No files attached
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    This document does not have downloadable files.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-muted transition hover:border-ink hover:text-ink"
            >
              Close
            </button>

            {selected.files?.length > 0 && (
              <button
                type="button"
                onClick={() => onZipDownload(selected)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-gold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <FileArchive size={17} />
                Download ZIP
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const DosDontsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);

  const [error, setError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [form, setForm] = useState({
    ...EMPTY_FORM,
  });

  const loadItems = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getAllDosDonts();

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
        setError(result?.message || "Failed to load documents.");
      }
    } catch (error) {
      console.error("Failed to load Dos & Don'ts:", error);

      setItems([]);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load documents."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter title.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const result = await createDosDonts({
        title: form.title.trim(),
        description: form.description.trim(),
        files: form.files,
      });

      if (result?.success) {
        setShowAdd(false);

        setForm({
          ...EMPTY_FORM,
        });

        await loadItems();
      } else {
        setError(result?.message || "Unable to create document.");
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

      const result = await getDosDontsById(id);

      if (result?.success) {
        setSelected(result.data);
        setShowView(true);
      } else {
        setError(result?.message || "Unable to fetch details.");
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to fetch details."
      );
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;

    try {
      setDeleting(true);
      setError("");

      const result = await deleteDosDonts(deleteTarget._id);

      if (result?.success) {
        setItems((previous) =>
          previous.filter((item) => item._id !== deleteTarget._id)
        );

        setDeleteTarget(null);
      } else {
        setError(result?.message || "Delete failed.");
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

  const handleFileDownload = async (item, file) => {
    try {
      await downloadDosDontsFile(item._id, file._id);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "File download failed."
      );
    }
  };

  const handleZipDownload = async (item) => {
    try {
      await downloadDosDontsZip(item._id);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "ZIP download failed."
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "—";

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
                Dos & Don'ts
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                Manage guidelines, documents and downloadable resources.
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setError("");
                setForm({
                  ...EMPTY_FORM,
                });
                setShowAdd(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-black shadow-lg transition hover:shadow-xl"
            >
              <Plus size={17} />
              Add Document
            </motion.button>
          </div>
        </motion.div>

        <ErrorMessage error={error} />

        <SummaryCards items={items} />

        <motion.div
          variants={itemVariants}
          className="rounded-[2rem] border border-line bg-white p-5 shadow-sm sm:p-7"
        >
          {loading ? (
            <LoadingState text="Loading documents..." />
          ) : items.length === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-gold">
                  <FolderOpen size={28} />
                </div>

                <p className="mt-4 font-display text-lg font-semibold text-ink">
                  No documents found
                </p>

                <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-muted">
                  Create a new Dos & Don'ts document to get started.
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
                  Add Document
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
                    className="group relative overflow-hidden rounded-[1.5rem] border border-line bg-white p-5 shadow-sm transition hover:shadow-xl"
                  >
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold/5 transition duration-500 group-hover:scale-150" />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-gold shadow-md">
                          <FileText size={20} />
                        </div>

                        <span className="rounded-full bg-gold/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gold-hover">
                          {item.files?.length || 0} Files
                        </span>
                      </div>

                      <h3 className="mt-5 line-clamp-1 font-display text-lg font-semibold text-ink">
                        {item.title || "Untitled Document"}
                      </h3>

                      <p className="mt-2 line-clamp-3 min-h-[66px] text-sm leading-6 text-muted">
                        {item.description || "No description available."}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <FileArchive size={14} className="text-gold" />

                          <span>
                            {item.files?.length || 0} file
                            {(item.files?.length || 0) !== 1 ? "s" : ""}
                          </span>
                        </div>

                        <span className="text-xs text-muted">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleView(item._id)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-3 py-2.5 text-xs font-semibold text-gold transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          <Eye size={14} />
                          View
                        </button>

                        <button
                          type="button"
                          disabled={!item.files?.length}
                          onClick={() => handleZipDownload(item)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-xs font-semibold text-muted transition hover:border-gold hover:bg-gold/5 hover:text-gold-hover disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Download size={14} />
                          ZIP
                        </button>

                        {item.files?.length > 0 ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleFileDownload(item, item.files[0])
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-xs font-semibold text-muted transition hover:border-gold hover:bg-gold/5 hover:text-gold-hover"
                          >
                            <FileText size={14} />
                            File
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5 text-xs font-semibold text-muted/50"
                          >
                            <FileText size={14} />
                            No File
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-danger/20 bg-danger/5 px-3 py-2.5 text-xs font-semibold text-danger transition hover:bg-danger/10"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </motion.div>

      <AddDocumentModal
        show={showAdd}
        setShow={setShowAdd}
        form={form}
        setForm={setForm}
        submitting={submitting}
        onSubmit={handleCreate}
      />

      <ViewDocumentModal
        show={showView}
        selected={selected}
        setShow={setShowView}
        onFileDownload={handleFileDownload}
        onZipDownload={handleZipDownload}
      />

      <DeleteModal
        open={!!deleteTarget}
        title="Delete Dos & Don'ts"
        message={`Are you sure you want to delete "${
          deleteTarget?.title || "this document"
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

export default DosDontsPage;