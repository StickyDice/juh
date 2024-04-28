"use client";

import Delete from "@mui/icons-material/Delete";
import FileDownload from "@mui/icons-material/FileDownload";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { deleteContainer } from "~/services/deleteContainer";
import DeleteButton from "~/views/FilesTable/DeleteButton";
import DownloadButton from "~/views/FilesTable/DownloadButton";

interface ITableDataProps {
  containerFiles: string[][];
  isOwner: boolean;
  containerInfo: { userId: string; containerId: string };
  cookie: string;
}

export default function TableData({
  isOwner,
  containerFiles,
  containerInfo,
  cookie,
}: ITableDataProps) {
  async function handleDeleteClick(filename: string) {
    deleteContainer(containerInfo.userId, containerInfo.containerId, filename);
    // TODO: Дописать логику отображения изменений
  }

  const [files, setFiles] = useState(containerFiles);

  return (
    <>
      {files.map((file) => (
        <TableRow key={`${file[0]}.${file[1]}`} sx={{ "&:hover": { background: "$f2f2f2" } }}>
          <TableCell>{file[0]}</TableCell>
          <TableCell>{file[1]}</TableCell>
          <TableCell>
            <DownloadButton userId={containerInfo.userId} containerId={containerInfo.containerId}>
              <FileDownload />
            </DownloadButton>
          </TableCell>
          {isOwner && (
            <TableCell>
              <DeleteButton
                userId={containerInfo.userId}
                containerId={containerInfo.containerId}
                filename={`${file[0]}.${file[1]}`}
                cookie={cookie}
              >
                <Delete />
              </DeleteButton>
            </TableCell>
          )}
        </TableRow>
      ))}
    </>
  );
}
