import React, { useEffect, useState } from "react";
import "./CreateHotel.css";
import { createHotel, getAllHotelNames } from "../../api/Controller/hotels";

const CreateHotel = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    location: "",
    tagline: "",
    story: "",
    whyItStandsOut: "",
    signatureExperience: "",
  });

  const [images, setImages] = useState([]);
  const [hotelNames, setHotelNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchHotelNames = async () => {
      try {
        const result = await getAllHotelNames();

        console.log("Hotel Names Response:", result);

        if (result?.success) {
          setHotelNames(result.data || []);
        } else {
          setHotelNames([]);
        }
      } catch (error) {
        console.error("Get hotel names error:", error);
        setHotelNames([]);
      }
    };

    fetchHotelNames();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Hotel name is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("city", formData.city);
      data.append("location", formData.location);
      data.append("tagline", formData.tagline);
      data.append("story", formData.story);
      data.append("whyItStandsOut", formData.whyItStandsOut);
      data.append("signatureExperience", formData.signatureExperience);

      // Add multiple images
      images.forEach((image) => {
        data.append("images", image);
      });

      const result = await createHotel(data);

      console.log("Create Hotel Response:", result);

      if (result?.success) {
        onSuccess?.(result.data);
        onClose();
      } else {
        setError(result?.message || "Failed to create hotel.");
      }
    } catch (error) {
      console.error("Create hotel error:", error);

      setError(
        error?.response?.data?.message ||
          "Something went wrong while creating hotel.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-hotel-overlay" onClick={onClose}>
      <div className="create-hotel-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="create-hotel-header">
          <div>
            <h2>Create Hotel</h2>
            <p>Add a new hotel to the system</p>
          </div>

          <button
            type="button"
            className="create-hotel-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Error */}
        {error && <div className="create-hotel-error">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="create-hotel-form">
            {/* Name */}
            <div className="form-group">
              <label>
                Hotel Name <span>*</span>
              </label>

              <select
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              >
                <option value="">Select Hotel Name</option>

                {hotelNames.map((hotel) => (
                  <option key={hotel._id} value={hotel.name}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
              <label>Tagline</label>

              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="Enter short hotel tagline"
              />
            </div>

            {/* Story */}
            <div className="form-group">
              <label>Story</label>

              <textarea
                name="story"
                value={formData.story}
                onChange={handleChange}
                placeholder="Enter hotel story or background"
                rows="4"
              />
            </div>

            {/* Why It Stands Out */}
            <div className="form-group">
              <label>Why It Stands Out</label>

              <textarea
                name="whyItStandsOut"
                value={formData.whyItStandsOut}
                onChange={handleChange}
                placeholder="What makes the hotel unique?"
                rows="4"
              />
            </div>

            {/* Signature Experience */}
            <div className="form-group">
              <label>Signature Experience</label>

              <textarea
                name="signatureExperience"
                value={formData.signatureExperience}
                onChange={handleChange}
                placeholder="Enter special experience offered by the hotel"
                rows="4"
              />
            </div>

            {/* Images */}
            <div className="form-group">
              <label>Hotel Images</label>

              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
              />

              {images.length > 0 && (
                <div className="selected-images">
                  {images.map((image, index) => (
                    <div className="selected-image" key={index}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Hotel ${index + 1}`}
                      />

                      <span>{image.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="create-hotel-footer">
            <button
              type="button"
              className="create-hotel-cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-hotel-submit-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Hotel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHotel;
