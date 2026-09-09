export default function Loader({ label = "Loading", full = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 text-muted ${
        full ? "h-[60vh]" : "py-16"
      }`}
    >
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-line" />
        <div className="absolute inset-0 rounded-full border-2 border-t-gold border-transparent animate-spin" />
      </div>
      <p className="text-sm tracking-wide">{label}…</p>
    </div>
  );
}
