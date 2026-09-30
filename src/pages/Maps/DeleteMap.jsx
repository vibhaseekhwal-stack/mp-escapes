import React from "react";
import "./DeleteMap.css";

export default function DeleteMap({
  map,
  onClose,
  onConfirm,
}) {
  if (!map) return null;

  return (
    <div className="delete-map-overlay">
      <div className="delete-map-modal">

        <div className="delete-map-icon">
          🗑
        </div>

        <h2>Delete Map?</h2>

        <p>
          Are you sure you want to delete the map for{" "}
          <strong>{map.cityName}</strong>?
        </p>

        <p className="delete-warning">
          This action cannot be undone.
        </p>

        <div className="delete-map-actions">
          <button
            type="button"
            className="delete-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="delete-confirm-btn"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}