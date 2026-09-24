import React, { useEffect, useState } from "react";
import "./Category.css";
import { getDownloads , uploadDownloads,  deleteDownloadCategory,
 } from "../../api/Controller/category";
import UploadDownloadPopup from "./UploadFiles/UploadDownloadPopup";
const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ NEW STATE — track which category is currently expanded
  const [openCategory, setOpenCategory] = useState(null);

  // ✅ NEW STATE — search box ke liye (optional but useful)
  const [search, setSearch] = useState("");
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedFile, setSelectedFile] = useState(null);
const [showUploadPopup, setShowUploadPopup] = useState(false);
  const fetchDownloads = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getDownloads();

      if (result.success) {
        setDownloads(result.data || []);
      } else {
        setError(result.message || "Failed to fetch downloads");
      }
    } catch (error) {
      console.error("Get Downloads Error:", error);
      setError(
        error.response?.data?.message ||
          "Something went wrong while fetching downloads.",
      );
    } finally {
      setLoading(false);
    }
  };
const handleUpload = async (formData) => {
  try {
    const result = await uploadDownloads(formData);

    if (result.success) {
      await fetchDownloads();

      return {
        success: true,
        message: result.message,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to upload files",
    };
  } catch (error) {
    console.error("Upload File Error:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Something went wrong while uploading files.",
    };
  }
};
  useEffect(() => {
    fetchDownloads();
  }, []);

  const handleViewFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ NEW FUNCTION — accordion toggle (ek time me ek hi category open)
  const toggleCategory = (categoryId) => {
    setOpenCategory((prev) => (prev === categoryId ? null : categoryId));
  };
const handleDeleteClick = (file) => {
  setSelectedFile(file);
  setShowDeleteModal(true);
};

const handleDelete = async () => {
  try {
    setLoading(true);

    const result = await deleteDownloadCategory(selectedFile?._id);

    if (result.success) {
      setShowDeleteModal(false);
      setSelectedFile(null);

      await fetchDownloads();
    } else {
      setError(result.message || "Failed to delete file");
    }
  } catch (error) {
    console.error("Delete Download Error:", error);

    setError(
      error.response?.data?.message ||
        "Something went wrong while deleting the file."
    );
  } finally {
    setLoading(false);
  }
};
  // ✅ NEW — search filter (category name ya file name se match)
  const filteredDownloads = downloads
    .map((category) => {
      if (!search.trim()) return category;

      const matchesCategory = category.categoryName
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchingFiles = (category.files || []).filter((file) =>
        file.originalName?.toLowerCase().includes(search.toLowerCase()),
      );

      if (matchesCategory) return category;
      if (matchingFiles.length > 0) return { ...category, files: matchingFiles };
      return null;
    })
    .filter(Boolean);

  const totalFiles = downloads.reduce(
    (total, category) => total + (category.files?.length || 0),
    0,
  );

  return (
    <div className="downloads-page">
      {/* ================= HEADER ================= */}
      <div className="downloads-header">
        <div>
          <h2>Downloads</h2>
          <p>Manage brochures, maps and other downloadable files</p>
        </div>

        <button
  className="upload-file-btn"
  onClick={() => setShowUploadPopup(true)}
>
  + Upload File
</button>
      </div>

      {/* ================= STATS ================= */}
      <div className="download-stats">
        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div>
            <span>Total Categories</span>
            <h3>{downloads.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div>
            <span>Total Files</span>
            <h3>{totalFiles}</h3>
          </div>
        </div>
      </div>

      {/* ================= ERROR ================= */}
      {error && <div className="error-message">{error}</div>}

  
      <div className="table-card">
        <div className="table-top">
          <div>
            <h3>Download Files</h3>
            <p>
              {downloads.length} categor
              {downloads.length === 1 ? "y" : "ies"} found
            </p>
          </div>

          {/* ✅ NEW — search input */}
          <input
            type="text"
            className="search-input"
            placeholder="Search category or file..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading downloads...</p>
          </div>
        ) : filteredDownloads.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h3>No Downloads Found</h3>
            <p>There are no downloadable files available.</p>
          </div>
        ) : (
          <div className="accordion-list">
            {filteredDownloads.map((category) => {
              const files = category.files || [];
              const isOpen = openCategory === category._id;

              return (
                <div
                  className={`category-card ${isOpen ? "open" : ""}`}
                  key={category._id}
                >
                  {/* ---- CATEGORY HEADER (clickable) ---- */}
                  <button
                    className="category-header"
                    onClick={() => toggleCategory(category._id)}
                  >
                    <div className="category-cell">
                      <div className="category-icon">📁</div>
                      <div>
                        <strong>{category.categoryName}</strong>
                        <small>
                          {files.length} {files.length === 1 ? "file" : "files"}
                        </small>
                      </div>
                    </div>

                    <span className="chevron">{isOpen ? "▲" : "▼"}</span>
                  </button>

                  {/* ---- FILE LIST (only shown when open) ---- */}
                  {isOpen && (
                    <div className="file-list">
                      {files.length === 0 ? (
                        <div className="no-file">No files available</div>
                      ) : (
                        files.map((file) => (
                          <div className="file-row" key={file._id}>
                            <div className="file-name">
                              <span className="pdf-icon">📄</span>
                              <span title={file.originalName}>
                                {file.originalName}
                              </span>
                            </div>

                            {/* ❌ REMOVED: fileUrl and publicId shown as text */}

                        <div className="action-buttons">
  <button
    className="view-btn"
    onClick={() => handleViewFile(file.fileUrl)}
    title="View File"
  >
    👁 
  </button>

  <button
    className="download-btn"
    onClick={() =>
      handleDownload(file.fileUrl, file.originalName)
    }
    title="Download File"
  >
    ↓ 
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDeleteClick(file)}
    title="Delete File"
  >
    🗑 
  </button>
</div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {showDeleteModal && (
  <div className="delete-modal-overlay">
    <div className="delete-modal">
      <div className="delete-modal-icon">
        🗑
      </div>

      <h3>Are you sure?</h3>

      <p>
        Are you sure you want to delete{" "}
        <strong>{selectedFile?.originalName}</strong>?
      </p>

      <div className="delete-modal-actions">
        <button
          className="cancel-delete-btn"
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedFile(null);
          }}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={handleDelete}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)}

<UploadDownloadPopup
  isOpen={showUploadPopup}
  onClose={() => setShowUploadPopup(false)}
  onSuccess={() => {
    fetchDownloads();
  }}
/>
    </div>
  );
};

export default Downloads;