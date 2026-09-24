import React, { useEffect, useState } from "react";
import {
  getAllGuidelines,
  deleteGuideline,
} from "../../api/Controller/guidelines";
import "./Guidelines.css";
import UploadGuideline from "./UploadGuideline/UploadGuideline";
const Guidelines = () => {
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); // jis guideline ko delete karna hai
  const [deleting, setDeleting] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fetchGuidelines = async () => {
    try {
      setLoading(true);

      const response = await getAllGuidelines();

      if (response?.success) {
        setGuidelines(response.data || []);
      } else {
        setGuidelines([]);
      }
    } catch (error) {
      console.error("Failed to fetch guidelines:", error);
      setGuidelines([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuidelines();
  }, []);

  const toggleGuideline = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };
  const handleDeleteClick = (e, guideline) => {
    e.stopPropagation(); // taaki accordion open/close na ho
    setDeleteTarget(guideline);
  };

  const cancelDelete = () => setDeleteTarget(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await deleteGuideline(deleteTarget._id);

      setGuidelines((prev) => prev.filter((g) => g._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete guideline. Try again.");
    } finally {
      setDeleting(false);
    }
  };
  const handleView = (fileUrl) => {
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

  const filteredGuidelines = guidelines
    .map((g) => {
      if (!search.trim()) return g;

      const q = search.toLowerCase();
      const matchesTitle = g.title?.toLowerCase().includes(q);
      const matchesDesc = g.description?.toLowerCase().includes(q);

      const matchingPdf = (g.pdfFiles || []).filter((f) =>
        f.originalName?.toLowerCase().includes(q),
      );
      const matchingDocx = (g.docxFiles || []).filter((f) =>
        f.originalName?.toLowerCase().includes(q),
      );

      if (matchesTitle || matchesDesc) return g;
      if (matchingPdf.length || matchingDocx.length) {
        return { ...g, pdfFiles: matchingPdf, docxFiles: matchingDocx };
      }
      return null;
    })
    .filter(Boolean);

  const totalPdf = guidelines.reduce(
    (sum, g) => sum + (g.pdfFiles?.length || 0),
    0,
  );
  const totalDocx = guidelines.reduce(
    (sum, g) => sum + (g.docxFiles?.length || 0),
    0,
  );

  return (
    <div className="guidelines-container">
      {/* ================= HEADER ================= */}
      <div className="guidelines-header">
        <div>
          <h2>Guidelines</h2>
          <p>Manage all guidelines and related documents</p>
        </div>
        <button
          className="upload-guideline-btn"
          onClick={() => setShowUploadModal(true)}
        >
          + Upload Guideline
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="guideline-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div>
            <span>Total Guidelines</span>
            <h3>{guidelines.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pdf">📕</div>
          <div>
            <span>Total PDF Files</span>
            <h3>{totalPdf}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon docx">📘</div>
          <div>
            <span>Total DOCX Files</span>
            <h3>{totalDocx}</h3>
          </div>
        </div>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="guidelines-card-wrapper">
        <div className="guidelines-top">
          <div>
            <h3>All Guidelines</h3>
            <p>
              {filteredGuidelines.length} guideline
              {filteredGuidelines.length === 1 ? "" : "s"} found
            </p>
          </div>

          <input
            type="text"
            className="search-input"
            placeholder="Search guideline or file..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading">
            <div className="loader"></div>
            <p>Loading guidelines...</p>
          </div>
        ) : filteredGuidelines.length === 0 ? (
          <div className="no-data">
            <div className="empty-icon">📂</div>
            <h3>No Guidelines Found</h3>
            <p>There are no guidelines available right now.</p>
          </div>
        ) : (
          <div className="guidelines-list">
            {filteredGuidelines.map((guideline) => {
              const pdfFiles = guideline.pdfFiles || [];
              const docxFiles = guideline.docxFiles || [];
              const totalFiles = pdfFiles.length + docxFiles.length;
              const isOpen = openId === guideline._id;

              return (
                <div
                  className={`guideline-card ${isOpen ? "open" : ""}`}
                  key={guideline._id}
                >
                  {/* ---- HEADER (clickable) ---- */}
                  <button
                    className="guideline-header"
                    onClick={() => toggleGuideline(guideline._id)}
                  >
                    <div className="guideline-title-cell">
                      <div className="guideline-icon">📄</div>

                      <div>
                        <strong>{guideline.title}</strong>
                        <p className="guideline-desc">
                          {guideline.description}
                        </p>

                        <div className="guideline-meta">
                          <span className="badge">{totalFiles} files</span>
                          {pdfFiles.length > 0 && (
                            <span className="badge badge-pdf">
                              {pdfFiles.length} PDF
                            </span>
                          )}
                          {docxFiles.length > 0 && (
                            <span className="badge badge-docx">
                              {docxFiles.length} DOCX
                            </span>
                          )}
                          <span className="meta-date">
                            {guideline.createdAt
                              ? new Date(
                                  guideline.createdAt,
                                ).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="header-actions">
                      <button
                        className="delete-btn"
                        onClick={(e) => handleDeleteClick(e, guideline)}
                        title="Delete Guideline"
                      >
                        🗑
                      </button>
                      <span className="chevron">{isOpen ? "▲" : "▼"}</span>
                    </div>{" "}
                  </button>

                  {/* ---- EXPANDED CONTENT ---- */}
                  {isOpen && (
                    <div className="guideline-body">
                      {pdfFiles.length > 0 && (
                        <div className="file-section">
                          <h4>
                            <span className="section-icon pdf">📕</span> PDF
                            Files
                            <span className="count-pill">
                              {pdfFiles.length}
                            </span>
                          </h4>

                          <div className="file-grid">
                            {pdfFiles.map((file) => (
                              <div className="file-item" key={file._id}>
                                <div className="file-name">
                                  <span className="file-type-icon pdf">
                                    PDF
                                  </span>
                                  <span title={file.originalName}>
                                    {file.originalName}
                                  </span>
                                </div>

                                <div className="file-actions">
                                  <button
                                    className="view-btn"
                                    onClick={() => handleView(file.fileUrl)}
                                    title="View"
                                  >
                                    👁
                                  </button>
                                  <button
                                    className="download-btn"
                                    onClick={() =>
                                      handleDownload(
                                        file.fileUrl,
                                        file.originalName,
                                      )
                                    }
                                    title="Download"
                                  >
                                    ↓
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {docxFiles.length > 0 && (
                        <div className="file-section">
                          <h4>
                            <span className="section-icon docx">📘</span> DOCX
                            Files
                            <span className="count-pill">
                              {docxFiles.length}
                            </span>
                          </h4>

                          <div className="file-grid">
                            {docxFiles.map((file) => (
                              <div className="file-item" key={file._id}>
                                <div className="file-name">
                                  <span className="file-type-icon docx">
                                    DOC
                                  </span>
                                  <span title={file.originalName}>
                                    {file.originalName}
                                  </span>
                                </div>

                                <div className="file-actions">
                                  <button
                                    className="view-btn"
                                    onClick={() => handleView(file.fileUrl)}
                                    title="View"
                                  >
                                    👁
                                  </button>
                                  <button
                                    className="download-btn"
                                    onClick={() =>
                                      handleDownload(
                                        file.fileUrl,
                                        file.originalName,
                                      )
                                    }
                                    title="Download"
                                  >
                                    ↓
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {totalFiles === 0 && (
                        <div className="no-file">
                          No files attached to this guideline.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {deleteTarget && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">⚠️</div>
            <h3>Delete Guideline?</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget.title}</strong>? This action cannot be
              undone.
            </p>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={cancelDelete}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="modal-delete"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showUploadModal && (
        <UploadGuideline
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            fetchGuidelines();
          }}
        />
      )}
    </div>
  );
};

export default Guidelines;
