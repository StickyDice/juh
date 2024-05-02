/**
 * Пример использования:
 * fetch("http://localhost:8000/test")
 * .then(async (res) => ({
 *   stream: await res.blob(),
 *   filename: res.headers.get("Content-Disposition")?.split("filename=")[1] || "file",
 * }))
 * .then(({ stream, filename }) => blobToDownload(stream, filename));
 */
export const blobToDownload = function (stream: Blob, filename: string) {
  const url = window.URL.createObjectURL(stream);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};
