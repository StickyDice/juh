"use client";
import { blobToDownload } from "~/shared/utils/blobToDownload";

export const downloadContainer = async (userId: string, containerId: string, filename?: string) => {
  return fetch(
    `http://localhost:8000/users/${encodeURIComponent(userId)}/containers/${encodeURIComponent(containerId)}/download${filename ? `?filename=${encodeURIComponent(filename)}` : ""}`,
    {
      method: "GET",
      credentials: "include",
    },
  )
    .then(async (res) => ({
      stream: await res.blob(),
      filename: res.headers.get("Content-Disposition")?.split("filename=")[1] || "file",
    }))
    .then((data) => blobToDownload(data.stream, data.filename));
};
