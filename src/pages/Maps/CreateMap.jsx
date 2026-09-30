import React, { useState } from "react";
import "./CreateMap.css";

export default function CreateMap({ onClose, onCreate }) {
  const [cityName, setCityName] = useState("");
  const [mapImage, setMapImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setMapImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName.trim()) {
      alert("Please enter city name.");
      return;
    }

    if (!mapImage) {
      alert("Please select a map image.");
      return;
    }

    const formData = new FormData();

    formData.append("cityName", cityName.trim());
    formData.append("mapImage", mapImage);

    await onCreate(formData);
  };

  return (
    <div className="create-map-overlay">
      <div className="create-map-modal">
        {/* Header */}
        <div className="create-map-header">
          <div>
            <h2>Create Map</h2>
            <p>Add a new city map</p>
          </div>

          <button
            type="button"
            className="create-map-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="create-map-form">
          {/* City Name */}
          <div className="create-map-field">
            <label htmlFor="cityName">
              City Name <span>*</span>
            </label>

            <input
              id="cityName"
              type="text"
              placeholder="Enter city name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>

          {/* Map Image */}
          <div className="create-map-field">
            <label htmlFor="mapImage">
              Map Image <span>*</span>
            </label>

            <div className="create-map-upload">
              <input
                id="mapImage"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageChange}
              />

              <label htmlFor="mapImage" className="upload-map-label">
                <span className="upload-icon">↑</span>

                <span>
                  {mapImage ? mapImage.name : "Choose map image"}
                </span>

                <small>JPG, JPEG or PNG</small>
              </label>
            </div>
          </div>

          {/* Preview */}
          {preview && (
            <div className="create-map-preview">
              <p>Image Preview</p>

              <img src={preview} alt="Map Preview" />
            </div>
          )}

          {/* Actions */}
          <div className="create-map-actions">
            <button
              type="button"
              className="create-map-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-map-submit"
            >
              Create Map
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}