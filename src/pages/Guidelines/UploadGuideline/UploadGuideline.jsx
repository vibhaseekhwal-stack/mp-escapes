import React, { useState } from "react";
import { createGuideline } from "../../../api/Controller/guidelines";
import "./UploadGuideline.css";

const UploadGuideline = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    const allowedFiles = selectedFiles.filter((file) => {
      const fileName = file.name.toLowerCase();

      return (
        fileName.endsWith(".pdf") ||
        fileName.endsWith(".docx")
      );
    });

    if (allowedFiles.length !== selectedFiles.length) {
      alert("Only PDF and DOCX files are allowed.");
    }

    setFiles(allowedFiles);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter guideline title.");
      return;
    }

    if (files.length === 0) {
      alert("Please select at least one PDF or DOCX file.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title.trim());

      if (description.trim()) {
        formData.append("description", description.trim());
      }

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await createGuideline(formData);

      if (response?.success) {
        alert(response.message || "Guideline uploaded successfully.");

        if (onSuccess) {
          onSuccess(response.data);
        }

        onClose();
      } else {
        alert(response?.message || "Failed to create guideline.");
      }
    } catch (error) {
      console.error("Create Guideline Error:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to upload guideline. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-guideline-overlay" onClick={onClose}>
      <div
        className="upload-guideline-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= HEADER ================= */}
        <div className="upload-guideline-header">
          <div>
            <h2>Upload Guideline</h2>
            <p>Add a new guideline with PDF or DOCX files</p>
          </div>

          <button
            type="button"
            className="upload-close-btn"
            onClick={onClose}
            disabled={loading}
          >
            ×
          </button>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit}>
          {/* TITLE */}
          <div className="upload-form-group">
            <label>
              Title <span>*</span>
            </label>

            <input
              type="text"
              placeholder="Enter guideline title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="upload-form-group">
            <label>Description</label>

            <textarea
              placeholder="Enter guideline description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              disabled={loading}
            />
          </div>

          {/* FILES */}
          <div className="upload-form-group">
            <label>
              Guideline Files <span>*</span>
            </label>

            <label className="file-upload-box">
              <input
                type="file"
                multiple
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                disabled={loading}
              />

              <div className="file-upload-content">
                <div className="upload-icon">📁</div>

                <strong>Click to select files</strong>

                <span>
                  PDF or DOCX files only
                </span>

                <small>
                  You can select multiple files
                </small>
              </div>
            </label>

            {/* SELECTED FILES */}
            {files.length > 0 && (
              <div className="selected-files">
                <div className="selected-files-title">
                  Selected Files ({files.length})
                </div>

                {files.map((file, index) => (
                  <div className="selected-file" key={`${file.name}-${index}`}>
                    <div className="selected-file-info">
                      <span
                        className={`selected-file-icon ${
                          file.name.toLowerCase().endsWith(".pdf")
                            ? "pdf"
                            : "docx"
                        }`}
                      >
                        {file.name.toLowerCase().endsWith(".pdf")
                          ? "PDF"
                          : "DOC"}
                      </span>

                      <div>
                        <strong>{file.name}</strong>

                        <small>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </small>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={() => removeFile(index)}
                      disabled={loading}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="upload-modal-actions">
            <button
              type="button"
              className="upload-cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="upload-submit-btn"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Guideline"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadGuideline;