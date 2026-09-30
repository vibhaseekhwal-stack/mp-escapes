import React, { useEffect, useState } from "react";
import "./Media.css";
import { getAllMedia } from "../../api/Controller/media";
import CommonLoader from "../../components/CommonLoader";
export function Media() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getAllMedia();

      if (result?.success) {
        setMedia(result.data || []);
      } else {
        setError("Failed to fetch media.");
      }
    } catch (err) {
      console.error("Get All Media Error:", err);
      setError("Something went wrong while fetching media.");
    } finally {
      setLoading(false);
    }
  };

  const getFileUrl = (filePath) => {
    if (!filePath) return "";

    if (filePath.startsWith("http")) {
      return filePath;
    }

    return `https://mp-escapes.onrender.com/${filePath}`;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="media-page">
      <div className="media-header">
        <div>
          <h2>Media</h2>
          <p>Manage all media content including images and videos.</p>
        </div>
      </div>

      <div className="media-table-container">
       {loading ? (
  <CommonLoader />
) : error ? (
          <div className="media-error">{error}</div>
        ) : media.length === 0 ? (
          <div className="media-empty">No media found.</div>
        ) : (
          <table className="media-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Images</th>
                <th>Videos</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {media.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="media-title">{item.title || "-"}</div>
                  </td>

                  <td>
                    <div className="media-description">
                      {item.description || "-"}
                    </div>
                  </td>

                  <td>
                    <div className="media-files">
                      {item.images?.length > 0 ? (
                        item.images.map((image, imageIndex) => (
                          <a
                            key={imageIndex}
                            href={getFileUrl(image)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="media-image-item"
                          >
                            <img
                              src={getFileUrl(image)}
                              alt={`Media ${imageIndex + 1}`}
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </a>
                        ))
                      ) : (
                        <span className="no-media">No Images</span>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className="media-video-list">
                      {item.videos?.length > 0 ? (
                        item.videos.map((video, videoIndex) => (
                          <a
                            key={videoIndex}
                            href={getFileUrl(video)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-link"
                          >
                            🎥 Video {videoIndex + 1}
                          </a>
                        ))
                      ) : (
                        <span className="no-media">No Videos</span>
                      )}
                    </div>
                  </td>

                  <td>{formatDate(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Media;