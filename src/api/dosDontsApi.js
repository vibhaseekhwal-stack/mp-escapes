import axiosInstance from "./axiosInstance";

const BASE_URL = "/dos-donts";

// 1. CREATE DOS & DON'TS
export const createDosDonts = async ({
  title,
  description,
  files = [],
}) => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axiosInstance.post(
    BASE_URL,
    formData
  );

  return response.data;
};

// 2. GET ALL DOS & DON'TS
export const getAllDosDonts = async () => {
  const response = await axiosInstance.get(BASE_URL);

  return response.data;
};

// 3. GET DOS & DON'TS BY ID
export const getDosDontsById = async (id) => {
  const response = await axiosInstance.get(
    `${BASE_URL}/${id}`
  );

  return response.data;
};

// 4. DOWNLOAD SINGLE FILE
export const downloadDosDontsFile = async (
  id,
  fileId
) => {
  const response = await axiosInstance.get(
    `${BASE_URL}/${id}/files/${fileId}/download`,
    {
      responseType: "blob",
    }
  );

  let fileName = "downloaded-file";

  const contentDisposition =
    response.headers["content-disposition"];

  if (contentDisposition) {
    const match = contentDisposition.match(
      /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    );

    if (match?.[1]) {
      fileName = match[1].replace(/['"]/g, "");
    }
  }

  const blob = new Blob([response.data], {
    type:
      response.headers["content-type"] ||
      "application/octet-stream",
  });

  const downloadUrl =
    window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(downloadUrl);

  return {
    success: true,
    fileName,
  };
};

// 5. DOWNLOAD ALL FILES ZIP
export const downloadDosDontsZip = async (id) => {
  const response = await axiosInstance.get(
    `${BASE_URL}/${id}/zip`,
    {
      responseType: "blob",
    }
  );

  let fileName = "dos-donts.zip";

  const contentDisposition =
    response.headers["content-disposition"];

  if (contentDisposition) {
    const match = contentDisposition.match(
      /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    );

    if (match?.[1]) {
      fileName = match[1].replace(/['"]/g, "");
    }
  }

  const blob = new Blob([response.data], {
    type: "application/zip",
  });

  const downloadUrl =
    window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(downloadUrl);

  return {
    success: true,
    fileName,
  };
};

// 6. DELETE DOS & DON'TS
export const deleteDosDonts = async (id) => {
  const response = await axiosInstance.delete(
    `${BASE_URL}/${id}`
  );

  return response.data;
};