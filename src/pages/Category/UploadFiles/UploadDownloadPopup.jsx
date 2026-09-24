import React, { useState } from "react";
import "./UploadDownloadPopup.css";

const UploadDownloadPopup = ({ isOpen, onClose, onUpload }) => {
  const [categoryName, setCategoryName] = useState("");
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // =========================
  // FILE SELECT
  // =========================
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    setFiles(selectedFiles);

    // Same file ko dobara select karne ki permission
    e.target.value = "";
  };

  // =========================
  // REMOVE SELECTED FILE
  // =========================
  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Please enter category name.");
      return;
    }

    if (files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    try {
      setIsSubmitting(true);

      // =========================
      // CREATE FORMDATA
      // =========================
      const formData = new FormData();

      formData.append("categoryName", categoryName.trim());

      files.forEach((file) => {
        formData.append("files", file);
      });

      // =========================
      // SEND FORMDATA TO PARENT
      // =========================
      const result = await onUpload(formData);

      if (result?.success) {
        handleClose();
      } else {
        alert(result?.message || "Failed to upload files.");
      }
    } catch (error) {
      console.error("Upload File Error:", error);

      alert(
        error?.message || "Something went wrong while uploading files."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================
  // CLOSE POPUP
  // =========================
  const handleClose = () => {
    if (isSubmitting) return;

    setCategoryName("");
    setFiles([]);

    onClose();
  };

  return (
    <div className="upload-modal-overlay">
      <div className="upload-modal">

        {/* ================= HEADER ================= */}
        <div className="upload-modal-header">
          <div>
            <h3>Upload File</h3>

            <p>
              Add a new downloadable category and files
            </p>
          </div>

          <button
            type="button"
            className="upload-close-btn"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit}>

          {/* ================= CATEGORY ================= */}
          <div className="upload-form-group">
            <label>
              Category Name
              <span>*</span>
            </label>

            <input
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* ================= FILES ================= */}
          <div className="upload-form-group">
            <label>
              Files
              <span>*</span>
            </label>

            <label
              htmlFor="download-file-upload"
              className="file-upload-box"
            >
              <div className="upload-icon">
                ↑
              </div>

              <div className="upload-text">
                <strong>Choose files</strong>

                <span>
                  Select one or multiple files to upload
                </span>
              </div>
            </label>

            <input
              id="download-file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              disabled={isSubmitting}
              hidden
            />

            {/* ================= SELECTED FILES ================= */}
            {files.length > 0 && (
              <div className="selected-files">

                <div className="selected-files-header">
                  <span>
                    Selected Files
                  </span>

                  <span className="file-count">
                    {files.length}
                  </span>
                </div>

                {files.map((file, index) => (
                  <div
                    className="selected-file-item"
                    key={`${file.name}-${index}`}
                  >
                    <div className="selected-file-info">

                      <div className="selected-file-icon">
                        📄
                      </div>

                      <div>
                        <strong title={file.name}>
                          {file.name}
                        </strong>

                        <small>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </small>
                      </div>

                    </div>

                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => handleRemoveFile(index)}
                      disabled={isSubmitting}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= FOOTER ================= */}
          <div className="upload-modal-footer">

            <button
              type="button"
              className="upload-cancel-btn"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="upload-submit-btn"
              disabled={
                isSubmitting ||
                !categoryName.trim() ||
                files.length === 0
              }
            >
              {isSubmitting
                ? "Uploading..."
                : "Upload Files"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDownloadPopup;