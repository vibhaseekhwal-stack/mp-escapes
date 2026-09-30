export default function GlassCard({ className = "", index = 0, children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      onMouseMove={onMove}
      style={{ "--i": index }}
      className={`glass rise ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}