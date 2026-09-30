import React, { useEffect, useState } from "react";
import "./ImageBank.css";
import {
  getAllImageBank,
  downloadAllImages,
  deleteImageBank,
} from "../../api/Controller/image_bank";
import UploadImage from "./UploadImage";
import CommonLoader from "../../components/CommonLoader.jsx";
import { toast } from "react-toastify";
export function ImageBank() {
  const handleDownloadAll = async () => {
    try {
      const blob = await downloadAllImages();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "image-bank.zip";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Images downloaded successfully.");
    } catch (error) {
      console.error("Download All Images Error:", error);

      toast.error("Failed to download images.");
    }
  };
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDeleteImage, setSelectedDeleteImage] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const handleDelete = async () => {
    if (!selectedDeleteImage) return;

    try {
      setDeleting(true);

      const result = await deleteImageBank(selectedDeleteImage._id);

      if (result?.success) {
        setImages((prev) =>
          prev.filter((image) => image._id !== selectedDeleteImage._id),
        );

        setSelectedDeleteImage(null);

        toast.success("Image deleted successfully.");
      } else {
        toast.error(result?.message || "Failed to delete image.");
      }
    } catch (error) {
      console.error("Delete Image Bank Error:", error);
      toast.error("Failed to delete image.");
    } finally {
      setDeleting(false);
    }
  };
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);

        const result = await getAllImageBank();

        if (result?.success) {
          setImages(result.data || []);
        } else {
          setError("Failed to fetch images");
        }
      } catch (error) {
        console.error("Image Bank Error:", error);
        setError("Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);
  const totalPages = Math.ceil(images.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentImages = images.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="image-bank-page">
      {/* Header */}
      <div className="image-bank-header">
        <div>
          <h1>Image Bank</h1>
          <p>Manage all uploaded images from the image bank.</p>
        </div>

        <div className="image-bank-header-actions">
          <button className="download-all-btn" onClick={handleDownloadAll}>
            Download All Images
          </button>
          <button
            className="upload-image-btn"
            onClick={() => setShowUploadModal(true)}
          >
            + Upload Image
          </button>

          <div className="image-bank-count">
            Total Images: <strong>{images.length}</strong>
          </div>
        </div>
      </div>

   {loading && <CommonLoader />}

{/* Table */}
{!loading && (
  <div className="image-bank-table-wrapper">
        <table className="image-bank-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Image</th>
              <th>Original Name</th>
              <th>Public ID</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {images.length > 0 ? (
              currentImages.map((image, index) => (
                <tr key={image._id}>
                  <td>{startIndex + index + 1}</td>

                  <td>
                    <div
                      className="image-bank-thumbnail"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img src={image.imageUrl} alt={image.originalName} />
                    </div>
                  </td>

                  <td>
                    <span className="image-name">{image.originalName}</span>
                  </td>

                  <td>
                    <span className="public-id">{image.publicId}</span>
                  </td>

                  <td>{formatDate(image.createdAt)}</td>

                  <td>
                    <div className="image-action-buttons">
                      <button
                        className="view-image-btn"
                        onClick={() => setSelectedImage(image)}
                      >
                        View
                      </button>

                      <button
                        className="delete-image-btn"
                        onClick={() => setSelectedDeleteImage(image)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-images">
                  No images found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    )}
      {/* View Image Detail Modal */}
      {selectedImage && (
        <div
          className="image-detail-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="image-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-image-detail-btn"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>

            <div className="image-detail-header">
              <h2>Image Details</h2>
              <p>Complete information about this image</p>
            </div>

            <div className="image-detail-content">
              <div className="image-detail-preview">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.originalName}
                />
              </div>

              <div className="image-detail-info">
                <div className="detail-item">
                  <span className="detail-label">Original Name</span>
                  <span className="detail-value">
                    {selectedImage.originalName}
                  </span>
                </div>

                

                <div className="detail-item">
                  <span className="detail-label">Public ID</span>
                  <span className="detail-value">{selectedImage.publicId}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Created At</span>
                  <span className="detail-value">
                    {formatDate(selectedImage.createdAt)}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Updated At</span>
                  <span className="detail-value">
                    {formatDate(selectedImage.updatedAt)}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Image URL</span>
                  <a
                    href={selectedImage.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-url-link"
                  >
                    Open Image
                  </a>
                </div>
              </div>
            </div>

            <div className="image-detail-footer">
              <button
                className="close-detail-btn"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedDeleteImage && (
        <div
          className="delete-image-overlay"
          onClick={() => !deleting && setSelectedDeleteImage(null)}
        >
          <div
            className="delete-image-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-image-icon">!</div>

            <h3>Delete Image?</h3>

            <p>Are you sure you want to delete this image?</p>

            <div className="delete-image-actions">
              <button
                className="cancel-delete-btn"
                onClick={() => setSelectedDeleteImage(null)}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showUploadModal && (
        <UploadImage onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
}

export default ImageBank;
