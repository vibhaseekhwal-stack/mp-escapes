import React from "react";

export default function ViewMap({ map, onClose }) {
  if (!map) return null;

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <style>
        {`
          .view-map-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
          }

          .view-map-modal {
            width: 100%;
            max-width: 650px;
            max-height: 90vh;
            overflow-y: auto;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
            animation: viewMapPopup 0.25s ease;
          }

          @keyframes viewMapPopup {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.97);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .view-map-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 24px;
            border-bottom: 1px solid #e8e8e8;
          }

          .view-map-header h3 {
            margin: 0;
            font-size: 21px;
            font-weight: 700;
            color: #1f2937;
          }

          .view-map-close {
            width: 36px;
            height: 36px;
            border: none;
            border-radius: 50%;
            background: #f3f4f6;
            color: #374151;
            font-size: 22px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
          }

          .view-map-close:hover {
            background: #e5e7eb;
            transform: rotate(90deg);
          }

          .view-map-body {
            padding: 24px;
          }

          .view-map-image-box {
            width: 100%;
            height: 320px;
            border-radius: 12px;
            overflow: hidden;
            background: #f3f4f6;
            border: 1px solid #e5e7eb;
            margin-bottom: 24px;
          }

          .view-map-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }

          .view-map-no-image {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9ca3af;
            font-size: 15px;
          }

          .view-map-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .view-map-detail {
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 15px 16px;
          }

          .view-map-detail.full-width {
            grid-column: 1 / -1;
          }

          .view-map-label {
            display: block;
            font-size: 12px;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
          }

          .view-map-value {
            display: block;
            font-size: 15px;
            font-weight: 600;
            color: #1f2937;
            word-break: break-word;
          }

          .view-map-footer {
            display: flex;
            justify-content: flex-end;
            padding: 16px 24px;
            border-top: 1px solid #e8e8e8;
          }

          .view-map-close-btn {
            border: none;
            padding: 10px 22px;
            border-radius: 8px;
            background: #1f2937;
            color: #ffffff;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .view-map-close-btn:hover {
            background: #111827;
            transform: translateY(-1px);
          }

          @media (max-width: 600px) {
            .view-map-overlay {
              padding: 12px;
            }

            .view-map-modal {
              max-height: 94vh;
            }

            .view-map-header {
              padding: 16px 18px;
            }

            .view-map-body {
              padding: 18px;
            }

            .view-map-image-box {
              height: 240px;
            }

            .view-map-details {
              grid-template-columns: 1fr;
            }

            .view-map-detail.full-width {
              grid-column: auto;
            }

            .view-map-footer {
              padding: 14px 18px;
            }
          }
        `}
      </style>

      <div
        className="view-map-overlay"
        onClick={onClose}
      >
        <div
          className="view-map-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="view-map-header">
            <h3>Map Details</h3>

            <button
              type="button"
              className="view-map-close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="view-map-body">
            <div className="view-map-image-box">
              {map.mapImage ? (
                <img
                  src={map.mapImage}
                  alt={`${map.cityName || "City"} map`}
                  className="view-map-image"
                />
              ) : (
                <div className="view-map-no-image">
                  No Map Image Available
                </div>
              )}
            </div>

            <div className="view-map-details">
              <div className="view-map-detail">
                <span className="view-map-label">
                  City Name
                </span>

                <span className="view-map-value">
                  {map.cityName || "-"}
                </span>
              </div>

              <div className="view-map-detail">
                <span className="view-map-label">
                  Created Date
                </span>

                <span className="view-map-value">
                  {formatDate(map.createdAt)}
                </span>
              </div>

              <div className="view-map-detail">
                <span className="view-map-label">
                  Updated Date
                </span>

                <span className="view-map-value">
                  {formatDate(map.updatedAt)}
                </span>
              </div>

              
            </div>
          </div>

          <div className="view-map-footer">
            <button
              type="button"
              className="view-map-close-btn"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}