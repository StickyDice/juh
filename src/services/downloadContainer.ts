function download(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  // the filename you want
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export const downloadContainer = async (userId: string, containerId: string, filename?: string) => {
  return fetch(
    `http://localhost:8000/users/${userId}/containers/${containerId}/download${filename ? `?filename${encodeURIComponent(filename)}` : ""}`,
    {
      method: "GET",
      credentials: "include",
    },
  )
    .then((response) => response.blob())
    .then((blob) => download(blob, filename ?? "new folder"));
};
