import { AlertTriangle, X } from "lucide-react";
import Button from "../Button/Button.jsx";

export default function DeleteModal({
  open,
  title = "Delete item",
  message = "This action cannot be undone. Are you sure you want to proceed?",
  onCancel,
  onConfirm,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-sm card p-6 shadow-elevated animate-[fadeIn_.15s_ease-out]">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-muted hover:text-ink"
        >
          <X size={18} />
        </button>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-danger/10 text-danger">
          <AlertTriangle size={20} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1.5 text-sm text-muted leading-relaxed">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="danger"
            className="!bg-danger !text-white !border-danger hover:!bg-danger/90"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
