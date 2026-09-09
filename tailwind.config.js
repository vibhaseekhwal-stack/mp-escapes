/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#0B0B0B",
          charcoal: "#1A1A1A",
        },
        gold: {
          DEFAULT: "#C9A227",
          hover: "#A8841F",
          50: "#FBF6E7",
        },
        surface: "#F8F8F6",
        ink: "#111111",
        muted: "#6B6B6B",
        line: "#E5E5E5",
        success: "#16803C",
        danger: "#C62828",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 10px rgba(11,11,11,0.06)",
        elevated: "0 8px 24px rgba(11,11,11,0.10)",
      },
      borderRadius: {
        xl2: "1.1rem",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(201,162,39,0.45)" },
          "70%": { boxShadow: "0 0 0 8px rgba(201,162,39,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(201,162,39,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out both",
        "fade-in": "fadeIn 0.5s ease-out both",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulseRing 2s ease-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
