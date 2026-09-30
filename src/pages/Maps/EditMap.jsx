import React, { useEffect, useState } from "react";
import "./EditMap.css";

export default function EditMap({ map, onClose, onUpdate }) {
  const [cityName, setCityName] = useState("");
  const [mapImage, setMapImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (map) {
      setCityName(map.cityName || "");
      setPreviewImage(map.mapImage || "");
      setMapImage(null);
    }
  }, [map]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setMapImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("cityname", cityName);

    if (mapImage) {
      formData.append("mapImage", mapImage);
    }

    onUpdate(map._id, formData);
  };

  if (!map) return null;

  return (
    <div className="edit-map-overlay">
      <div className="edit-map-modal">

        {/* Header */}
        <div className="edit-map-header">
          <div>
            <h2>Edit Map</h2>
            <p>Update city map details</p>
          </div>

          <button
            type="button"
            className="edit-map-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* City Name */}
          <div className="edit-map-field">
            <label>
              City Name <span>*</span>
            </label>

            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Enter city name"
              required
            />
          </div>

          {/* Current / New Image */}
          <div className="edit-map-field">
            <label>Map Image</label>

            {previewImage && (
              <div className="edit-map-preview">
                <img
                  src={previewImage}
                  alt="Map Preview"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <small>
              Leave empty if you don't want to replace the existing image.
            </small>
          </div>

          {/* Buttons */}
          <div className="edit-map-actions">
            <button
              type="button"
              className="edit-map-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-map-submit"
            >
              Update Map
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}