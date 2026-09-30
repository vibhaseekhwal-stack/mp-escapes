import React, { useState } from "react";
import "./UploadImage.css";
import { uploadImageBank } from "../../api/Controller/image_bank";
const UploadImage = ({ onClose }) => {
  const [images, setImages] = useState([null, null, null]);
  const [errors, setErrors] = useState("");

  const handleImageChange = (index, file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setErrors("Only JPG, JPEG and PNG images are allowed.");
      return;
    }

    setErrors("");

    const updatedImages = [...images];
    updatedImages[index] = file;

    setImages(updatedImages);
  };

 const handleUpload = async (e) => {
  e.preventDefault();

  if (!images[0]) {
    setErrors("Please select at least one image.");
    return;
  }

  try {
    setErrors("");

    const formData = new FormData();

    images.forEach((image) => {
      if (image) {
        formData.append("images", image);
      }
    });

    const result = await uploadImageBank(formData);

    if (result?.success) {
      onClose();
    } else {
      setErrors(result?.message || "Failed to upload images.");
    }
  } catch (error) {
    console.error("Upload Image Error:", error);

    setErrors(
      error?.response?.data?.message ||
      "Something went wrong while uploading images."
    );
  }
};
  return (
    <div className="upload-image-overlay">
      <div className="upload-image-modal">

        {/* Header */}
        <div className="upload-image-header">
          <div>
            <h2>Upload Image</h2>
            <p>Add images to your image bank.</p>
          </div>

          <button
            className="upload-close-btn"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleUpload}>

          {/* Image 1 */}
          <div className="image-upload-field">
            <label>
              Image 1 <span>*</span>
            </label>

            <div className="file-input-wrapper">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) =>
                  handleImageChange(0, e.target.files[0])
                }
              />
            </div>

            {images[0] && (
              <div className="selected-file">
                ✓ {images[0].name}
              </div>
            )}

            <small>Required — JPG, JPEG or PNG</small>
          </div>

          {/* Image 2 */}
          <div className="image-upload-field">
            <label>
              Image 2 <span className="optional">(Optional)</span>
            </label>

            <div className="file-input-wrapper">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) =>
                  handleImageChange(1, e.target.files[0])
                }
              />
            </div>

            {images[1] && (
              <div className="selected-file">
                ✓ {images[1].name}
              </div>
            )}

            <small>Additional image</small>
          </div>

          {/* Image 3 */}
          <div className="image-upload-field">
            <label>
              Image 3 <span className="optional">(Optional)</span>
            </label>

            <div className="file-input-wrapper">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) =>
                  handleImageChange(2, e.target.files[0])
                }
              />
            </div>

            {images[2] && (
              <div className="selected-file">
                ✓ {images[2].name}
              </div>
            )}

            <small>Additional image</small>
          </div>

          {/* Error */}
          {errors && (
            <div className="upload-image-error">
              {errors}
            </div>
          )}

          {/* Buttons */}
          <div className="upload-image-actions">

            <button
              type="button"
              className="cancel-upload-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-upload-btn"
            >
              Upload Image
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default UploadImage;