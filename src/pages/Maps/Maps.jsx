import React, { useEffect, useState } from "react";
import "./Maps.css";
import axiosInstance from "../../api/axiosInstance";
import EditMap from "./EditMap";
import ViewMap from "./ViewMap";
import CommonLoader from "../../components/CommonLoader.jsx";
import {
  createMap,
  updateMap,
  deleteMap,
  getMapById,
} from "../../api/Controller/map";
import DeleteMap from "./DeleteMap";
import CreateMap from "./CreateMap";
export function Maps() {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMap, setSelectedMap] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewMap, setViewMap] = useState(null);
  const getAllMaps = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get("/maps");

      if (response?.data?.success) {
        setMaps(response.data.data || []);
      } else {
        setMaps([]);
        setError("Failed to fetch maps.");
      }
    } catch (err) {
      console.error("Get All Maps API Error:", err);
      setError(err?.response?.data?.message || "Failed to fetch maps.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMap = async (formData) => {
    try {
      setError("");

      const response = await createMap(formData);

      if (response?.success) {
        setShowCreateModal(false);
        await getAllMaps();
      } else {
        setError(response?.message || "Failed to create map.");
      }
    } catch (err) {
      console.error("Create Map Error:", err);

      setError(err?.response?.data?.message || "Failed to create map.");
    }
  };
  const handleUpdateMap = async (id, formData) => {
    try {
      const response = await updateMap(id, formData);

      if (response?.success) {
        setShowEditModal(false);
        setSelectedMap(null);

        await getAllMaps();
      } else {
        setError(response?.message || "Failed to update map.");
      }
    } catch (err) {
      console.error("Update Map Error:", err);
      setError(err?.response?.data?.message || "Failed to update map.");
    }
  };
  const handleDeleteMap = async () => {
    try {
      const response = await deleteMap(selectedMap._id);

      if (response?.success) {
        setShowDeleteModal(false);
        setSelectedMap(null);

        await getAllMaps();
      } else {
        setError(response?.message || "Failed to delete map.");
      }
    } catch (err) {
      console.error("Delete Map Error:", err);
      setError(err?.response?.data?.message || "Failed to delete map.");
    }
  };
  const handleViewMap = async (id) => {
    try {
      setError("");

      const response = await getMapById(id);

      if (response?.success) {
        setViewMap(response.data);
        setShowViewModal(true);
      } else {
        setError(response?.message || "Failed to fetch map details.");
      }
    } catch (err) {
      console.error("Get Map By ID Error:", err);
      setError(err?.response?.data?.message || "Failed to fetch map details.");
    }
  };
  useEffect(() => {
    getAllMaps();
  }, []);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="maps-page">
      <div className="maps-header">
        <div>
          <h2>Maps</h2>
          <p>Manage city maps</p>
        </div>

        <div className="maps-header-actions">
          <button
            className="create-map-btn"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Map
          </button>
          <div className="maps-count">
            Total Maps: <strong>{maps.length}</strong>
          </div>
        </div>
      </div>
      <div className="maps-card">
        {loading ? (
          <CommonLoader />
        ) : error ? (
          <div className="maps-state maps-error">
            <p>{error}</p>
            <button onClick={getAllMaps}>Retry</button>
          </div>
        ) : maps.length === 0 ? (
          <div className="maps-state">
            <p>No maps found.</p>
          </div>
        ) : (
          <div className="maps-table-wrapper">
            <table className="maps-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>City Name</th>
                  <th>Map Image</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {maps.map((map, index) => (
                  <tr
                    key={map._id}
                    onClick={() => handleViewMap(map._id)}
                    className="map-row"
                  >
                    <td>{index + 1}</td>

                    <td>
                      <span className="maps-city-name">
                        {map.cityName || "-"}
                      </span>
                    </td>

                    <td>
                      {map.mapImage ? (
                        <div className="map-image-wrapper">
                          <img
                            src={map.mapImage}
                            alt={`${map.cityName || "City"} map`}
                            className="map-image"
                          />
                        </div>
                      ) : (
                        <span className="no-image">No Image</span>
                      )}
                    </td>

                    <td>{formatDate(map.createdAt)}</td>
                    <td>
                      <div className="map-actions">
                        <button
                          className="edit-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMap(map);
                            setShowEditModal(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMap(map);
                            setShowDeleteModal(true);
                          }}
                        >
                          Delete
                        </button>{" "}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showCreateModal && (
        <CreateMap
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateMap}
        />
      )}
      {showEditModal && (
        <EditMap
          map={selectedMap}
          onClose={() => {
            setShowEditModal(false);
            setSelectedMap(null);
          }}
          onUpdate={handleUpdateMap}
        />
      )}
      {showViewModal && viewMap && (
        <ViewMap
          map={viewMap}
          onClose={() => {
            setShowViewModal(false);
            setViewMap(null);
          }}
        />
      )}
      {showDeleteModal && (
        <DeleteMap
          map={selectedMap}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedMap(null);
          }}
          onConfirm={handleDeleteMap}
        />
      )}
    </div>
  );
}
