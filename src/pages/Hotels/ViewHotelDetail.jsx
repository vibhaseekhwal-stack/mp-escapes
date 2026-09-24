import React, { useEffect, useState } from "react";
import "./ViewHotelDetail.css";
import { getHotelById } from "../../api/Controller/hotels";

const ViewHotelDetail = ({ hotelId, onClose }) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHotelDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getHotelById(hotelId);

      console.log("Hotel Detail Response:", result);

      if (result?.success) {
        setHotel(result.data);
      } else {
        setError(result?.message || "Failed to fetch hotel details");
      }
    } catch (error) {
      console.error("Get hotel detail error:", error);

      setError(
        error?.response?.data?.message ||
          "Something went wrong while fetching hotel details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hotelId) {
      fetchHotelDetails();
    }
  }, [hotelId]);

  return (
    <div className="hotel-detail-overlay" onClick={onClose}>
      <div
        className="hotel-detail-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="hotel-detail-header">
          <h2>Hotel Details</h2>

          <button
            className="hotel-detail-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="hotel-detail-message">
            Loading hotel details...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="hotel-detail-error">
            {error}
          </div>
        )}

        {/* Hotel Details */}
        {!loading && !error && hotel && (
          <div className="hotel-detail-content">

            {/* Images */}
            <div className="hotel-detail-images">
              {Array.isArray(hotel.images) &&
              hotel.images.length > 0 ? (
                hotel.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${hotel.name} ${index + 1}`}
                  />
                ))
              ) : (
                <div className="no-hotel-image">
                  No Image Available
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div className="hotel-detail-info">

              <div className="hotel-detail-item">
                <span>Hotel Name</span>
                <strong>{hotel.name || "-"}</strong>
              </div>

              <div className="hotel-detail-item">
                <span>City</span>
                <strong>{hotel.city || "-"}</strong>
              </div>

              <div className="hotel-detail-item">
                <span>Location</span>
                <strong>{hotel.location || "-"}</strong>
              </div>

              <div className="hotel-detail-item">
                <span>Tagline</span>
                <strong>{hotel.tagline || "-"}</strong>
              </div>

              <div className="hotel-detail-item full-width">
                <span>Story</span>
                <p>{hotel.story || "-"}</p>
              </div>

              <div className="hotel-detail-item full-width">
                <span>Why It Stands Out</span>
                <p>{hotel.whyItStandsOut || "-"}</p>
              </div>

              <div className="hotel-detail-item full-width">
                <span>Signature Experience</span>
                <p>{hotel.signatureExperience || "-"}</p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewHotelDetail;