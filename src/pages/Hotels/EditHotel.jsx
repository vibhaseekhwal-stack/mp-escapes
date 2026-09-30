import React, { useEffect, useState } from "react";
import "./EditHotel.css";
import { updateHotel } from "../../api/Controller/hotels";

const EditHotel = ({ hotel, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    location: "",
    tagline: "",
    story: "",
    whyItStandsOut: "",
    signatureExperience: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Set existing hotel data
  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || "",
        city: hotel.city || "",
        location: hotel.location || "",
        tagline: hotel.tagline || "",
        story: hotel.story || "",
        whyItStandsOut: hotel.whyItStandsOut || "",
        signatureExperience: hotel.signatureExperience || "",
      });

      setExistingImages(
        Array.isArray(hotel.images) ? hotel.images : []
      );
    }
  }, [hotel]);

  // Handle text fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle new images
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setNewImages(files);
  };

  // Remove existing image
  const handleRemoveExistingImage = (indexToRemove) => {
    setExistingImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      // Text fields
      data.append("name", formData.name);
      data.append("city", formData.city);
      data.append("location", formData.location);
      data.append("tagline", formData.tagline);
      data.append("story", formData.story);
      data.append("whyItStandsOut", formData.whyItStandsOut);
      data.append(
        "signatureExperience",
        formData.signatureExperience
      );

      // Existing images to retain
      data.append(
        "existingImages",
        JSON.stringify(existingImages)
      );

      // New images
      newImages.forEach((image) => {
        data.append("images", image);
      });

      console.log("Updating Hotel:", hotel?._id);

      const result = await updateHotel(hotel._id, data);

      console.log("Update Hotel Response:", result);

      if (result?.success) {
        onSuccess?.(result.data);
        onClose();
      } else {
        setError(
          result?.message || "Failed to update hotel."
        );
      }
    } catch (error) {
      console.error("Update hotel error:", error);

      setError(
        error?.response?.data?.message ||
          "Something went wrong while updating hotel."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!hotel) return null;

  return (
    <div
      className="edit-hotel-overlay"
      onClick={onClose}
    >
      <div
        className="edit-hotel-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="edit-hotel-header">
          <div>
            <h2>Edit Hotel</h2>
            <p>Update hotel information</p>
          </div>

          <button
            type="button"
            className="edit-hotel-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="edit-hotel-error">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="edit-hotel-form">

            {/* Hotel Name */}
            <div className="edit-form-group">
              <label>Hotel Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter hotel name"
              />
            </div>

            {/* City */}
            <div className="edit-form-group">
              <label>City</label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
            </div>

            {/* Location */}
            <div className="edit-form-group full-width">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter complete hotel location"
              />
            </div>

            {/* Tagline */}
            <div className="edit-form-group full-width">
              <label>Tagline</label>

              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="Enter hotel tagline"
              />
            </div>

            {/* Story */}
            <div className="edit-form-group full-width">
              <label>Story</label>

              <textarea
                name="story"
                value={formData.story}
                onChange={handleChange}
                placeholder="Enter hotel story"
                rows="4"
              />
            </div>

            {/* Why It Stands Out */}
            <div className="edit-form-group full-width">
              <label>Why It Stands Out</label>

              <textarea
                name="whyItStandsOut"
                value={formData.whyItStandsOut}
                onChange={handleChange}
                placeholder="Enter unique features"
                rows="4"
              />
            </div>

            {/* Signature Experience */}
            <div className="edit-form-group full-width">
              <label>Signature Experience</label>

              <textarea
                name="signatureExperience"
                value={formData.signatureExperience}
                onChange={handleChange}
                placeholder="Enter signature experience"
                rows="4"
              />
            </div>

            {/* Existing Images */}
            <div className="edit-form-group full-width">
              <label>Existing Images</label>

              {existingImages.length > 0 ? (
                <div className="existing-images">
                  {existingImages.map((image, index) => (
                    <div
                      className="existing-image-item"
                      key={`${image}-${index}`}
                    >
                      <img
                        src={image}
                        alt={`Hotel ${index + 1}`}
                      />

                      <button
                        type="button"
                        className="remove-existing-image"
                        onClick={() =>
                          handleRemoveExistingImage(index)
                        }
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-existing-images">
                  No existing images
                </div>
              )}
            </div>

            {/* New Images */}
            <div className="edit-form-group full-width">
              <label>New Images</label>

              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
              />

              {newImages.length > 0 && (
                <div className="new-images">
                  {newImages.map((image, index) => (
                    <div
                      className="new-image-item"
                      key={`${image.name}-${index}`}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`New ${index + 1}`}
                      />

                      <span title={image.name}>
                        {image.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="edit-hotel-footer">
            <button
              type="button"
              className="edit-hotel-cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-hotel-submit-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Hotel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHotel;