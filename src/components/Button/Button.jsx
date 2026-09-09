const variants = {
  primary:
    "bg-black text-white hover:bg-black-charcoal border border-black",
  gold:
    "bg-gold text-white hover:bg-gold-hover border border-gold",
  outline:
    "bg-white text-ink border border-line hover:border-black/40 hover:bg-surface",
  ghost:
    "bg-transparent text-ink hover:bg-black/5 border border-transparent",
  danger:
    "bg-white text-danger border border-danger/30 hover:bg-danger/5",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gold/30 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2} />}
      {children}
    </button>
  );
}
