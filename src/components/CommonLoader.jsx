import React from "react";

const CommonLoader = () => {
  return (
    <>
      <style>{`
        /* =====================================================
           MP ESCAPES - COMMON ADMIN LOADER
           Small + Premium Yellow/Gold Theme
           ===================================================== */

        .mp-loader-page {
          position: fixed;
          inset: 0;
          z-index: 99999;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            radial-gradient(
              circle at center,
              rgba(255, 251, 235, 0.96) 0%,
              rgba(250, 250, 249, 0.98) 45%,
              #f8fafc 100%
            );

          overflow: hidden;
        }

        .mp-loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;

          transform: translateY(0);
        }

        /* =====================================================
           SMALL LOADER CIRCLE
           ===================================================== */

        .mp-loader-circle {
          position: relative;

          width: 58px;
          height: 58px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 11px;
        }

        /* =====================================================
           YELLOW / GOLD GRADIENT RING
           ===================================================== */

        .mp-loader-ring {
          position: absolute;
          inset: 0;

          width: 58px;
          height: 58px;

          box-sizing: border-box;

          border-radius: 50%;

          border: 4px solid rgba(234, 179, 8, 0.12);

          border-top-color: #f6d365;
          border-right-color: #e9b949;
          border-bottom-color: #c9922e;
          border-left-color: transparent;

          transform: rotate(-35deg);

          animation: mpLoaderRotate 1.5s linear infinite;

          filter:
            drop-shadow(
              0 0 7px rgba(201, 146, 46, 0.25)
            );
        }

        /* =====================================================
           INNER RING
           ===================================================== */

        .mp-loader-inner-ring {
          position: absolute;

          width: 42px;
          height: 42px;

          border-radius: 50%;

          border: 1px solid rgba(201, 146, 46, 0.12);

          box-shadow:
            inset 0 0 10px rgba(201, 146, 46, 0.05),
            0 0 12px rgba(201, 146, 46, 0.05);
        }

        /* =====================================================
           CENTER STAR
           ===================================================== */

        .mp-loader-star {
          position: relative;

          width: 18px;
          height: 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #d19a2a;

          font-size: 19px;
          line-height: 1;

          text-shadow:
            0 0 5px rgba(201, 146, 46, 0.3),
            0 0 10px rgba(201, 146, 46, 0.15);

          animation: mpStarPulse 1.5s ease-in-out infinite;
        }

        .mp-loader-star::before {
          content: "✦";
        }

        /* =====================================================
           BRAND
           ===================================================== */

        .mp-loader-brand {
          margin: 0;

          font-size: 16px;
          line-height: 1.2;

          font-weight: 800;

          letter-spacing: -0.3px;

          color: #3f3420;

          user-select: none;
        }

        .mp-loader-brand span {
          background:
            linear-gradient(
              135deg,
              #f6d365 0%,
              #e9b949 45%,
              #c9922e 100%
            );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          background-clip: text;
        }

        /* =====================================================
           SUBTITLE
           ===================================================== */

        .mp-loader-subtitle {
          margin: 4px 0 0;

          color: #8a8172;

          font-size: 9px;
          font-weight: 500;

          letter-spacing: 0.01em;
        }

        /* =====================================================
           PROGRESS DOTS
           ===================================================== */

        .mp-loader-dots {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 4px;

          margin-top: 8px;
        }

        .mp-loader-dot {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background: #e4d4ad;

          animation: mpDotPulse 1.2s ease-in-out infinite;
        }

        .mp-loader-dot:nth-child(1) {
          background: #e9b949;
          animation-delay: 0s;
        }

        .mp-loader-dot:nth-child(2) {
          background: #d8aa43;
          animation-delay: 0.15s;
        }

        .mp-loader-dot:nth-child(3) {
          background: #c9922e;
          animation-delay: 0.3s;
        }

        .mp-loader-dot:nth-child(4) {
          background: #b8862c;
          animation-delay: 0.45s;
        }

        /* =====================================================
           ANIMATIONS
           ===================================================== */

        @keyframes mpLoaderRotate {
          0% {
            transform: rotate(-35deg);
          }

          100% {
            transform: rotate(325deg);
          }
        }

        @keyframes mpStarPulse {
          0%,
          100% {
            transform: scale(0.85) rotate(0deg);
            opacity: 0.7;
          }

          50% {
            transform: scale(1.12) rotate(8deg);
            opacity: 1;
          }
        }

        @keyframes mpDotPulse {
          0%,
          100% {
            transform: scale(0.75);
            opacity: 0.4;
          }

          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }

        /* =====================================================
           MOBILE
           ===================================================== */

        @media (max-width: 600px) {
          .mp-loader-circle {
            width: 52px;
            height: 52px;

            margin-bottom: 9px;
          }

          .mp-loader-ring {
            width: 52px;
            height: 52px;

            border-width: 3px;
          }

          .mp-loader-inner-ring {
            width: 38px;
            height: 38px;
          }

          .mp-loader-star {
            font-size: 17px;
          }

          .mp-loader-brand {
            font-size: 15px;
          }

          .mp-loader-subtitle {
            font-size: 8px;
          }

          .mp-loader-dots {
            margin-top: 7px;
          }
        }

        /* =====================================================
           REDUCED MOTION
           ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .mp-loader-ring,
          .mp-loader-star,
          .mp-loader-dot {
            animation: none;
          }
        }
      `}</style>

      <div className="mp-loader-page">
        <div className="mp-loader-content">

          {/* Small Circular Loader */}
          <div className="mp-loader-circle">
            <div className="mp-loader-ring"></div>

            <div className="mp-loader-inner-ring"></div>

            <div className="mp-loader-star"></div>
          </div>

          {/* Brand */}
          <h1 className="mp-loader-brand">
            MP <span>Escapes</span>
          </h1>

          {/* Loading Text */}
          <p className="mp-loader-subtitle">
            Loading your amazing journey...
          </p>

          {/* Animated Dots */}
          <div className="mp-loader-dots">
            <span className="mp-loader-dot"></span>
            <span className="mp-loader-dot"></span>
            <span className="mp-loader-dot"></span>
            <span className="mp-loader-dot"></span>
          </div>

        </div>
      </div>
    </>
  );
};

export default CommonLoader;