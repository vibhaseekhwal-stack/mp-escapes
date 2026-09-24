import React, { useEffect, useState } from "react";
import "./Hotels.css";
import { getAllHotels, deleteHotel } from "../../api/Controller/hotels"; // apne actual controller path ke according change karo
import ViewHotelDetail from "./ViewHotelDetail";
import CreateHotel from "./CreateHotel";
const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedHotelId, setSelectedHotelId] = useState(null);
const [selectedDeleteHotel, setSelectedDeleteHotel] = useState(null);  
const [showCreateHotel, setShowCreateHotel] = useState(false);
// Get All Hotels
  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getAllHotels();

      console.log("Get All Hotels Response:", result);

      if (result?.success) {
        setHotels(result.data || []);
      } else {
        setHotels([]);
        setError(result?.message || "Failed to fetch hotels");
      }
    } catch (error) {
      console.error("Get hotels error:", error);
      setHotels([]);
      setError(
        error?.response?.data?.message ||
          "Something went wrong while fetching hotels",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="hotels-page">
      {/* Header */}
      <div className="hotels-header">
        <div>
          <h1>Hotels</h1>
          <p>Manage all available hotels</p>
        </div>

        <div className="hotel-header-actions">
  <button
  className="create-hotel-btn"
  onClick={() => setShowCreateHotel(true)}
>
  Create Hotel
</button>
  <div className="hotel-count">
    Total Hotels: <strong>{hotels.length}</strong>
  </div>
</div>
      </div>

      {/* Loading */}
      {loading && <div className="hotels-message">Loading hotels...</div>}

      {/* Error */}
      {!loading && error && <div className="hotels-error">{error}</div>}

      {/* Empty */}
      {!loading && !error && hotels.length === 0 && (
        <div className="hotels-message">No hotels found.</div>
      )}

      {/* Hotels Table */}
      {!loading && !error && hotels.length > 0 && (
        <div className="hotels-table-wrapper">
          <table className="hotels-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Hotel</th>
                <th>City</th>
                <th>Location</th>

                <th>Images</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {hotels.map((hotel, index) => (
                <tr key={hotel._id || index}>
                  {/* S.No */}
                  <td>{index + 1}</td>

                  <td>
                    <div
                      className="hotel-name"
                      onClick={() => setSelectedHotelId(hotel._id)}
                      style={{ cursor: "pointer" }}
                    >
                      {hotel.name || "-"}
                    </div>
                  </td>

                  {/* City */}
                  <td>
                    <span className="city-badge">
                      {hotel.city?.length > 7
                        ? `${hotel.city.slice(0, 7)}...`
                        : hotel.city || "-"}
                    </span>
                  </td>

                  {/* Location */}
                  <td>
                    <div className="hotel-location">
                      {hotel.location || "-"}
                    </div>
                  </td>

                  {/* Images */}
                  <td>
                    <div className="hotel-images">
                      {Array.isArray(hotel.images) &&
                      hotel.images.length > 0 ? (
                        hotel.images.map((image, imageIndex) => (
                          <img
                            key={imageIndex}
                            src={image}
                            alt={`${hotel.name || "Hotel"} ${imageIndex + 1}`}
                            className="hotel-image"
                          />
                        ))
                      ) : (
                        <span className="no-image">No Image</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="hotel-actions">
                      {/* Edit - Disabled */}
                      <button className="edit-btn" disabled>
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => setSelectedDeleteHotel(hotel)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedHotelId && (
        <ViewHotelDetail
          hotelId={selectedHotelId}
          onClose={() => setSelectedHotelId(null)}
        />
      )}
      {showCreateHotel && (
  <CreateHotel
    onClose={() => setShowCreateHotel(false)}
    onSuccess={() => {
      fetchHotels();
    }}
  />
)}
      {selectedDeleteHotel && (
        <div
          className="delete-modal-overlay"
          onClick={() => setSelectedDeleteHotel(null)}
        >
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Hotel</h3>

            <p>Are you sure you want to delete this hotel?</p>

            <div className="delete-modal-actions">
              <button
                className="cancel-delete-btn"
                onClick={() => setSelectedDeleteHotel(null)}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                onClick={async () => {
                  try {
                    const result = await deleteHotel(selectedDeleteHotel._id);

                    if (result?.success) {
                      setHotels((prevHotels) =>
                        prevHotels.filter(
                          (hotel) => hotel._id !== selectedDeleteHotel._id,
                        ),
                      );

                      setSelectedDeleteHotel(null);
                    }
                  } catch (error) {
                    console.error("Delete hotel error:", error);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
