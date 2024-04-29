"use client";

import Delete from "@mui/icons-material/Delete";
import FileDownload from "@mui/icons-material/FileDownload";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { deleteContainer } from "~/services/deleteContainer";
import DownloadButton from "~/views/FilesTable/DownloadButton";

interface ITableDataProps {
  containerFiles: string[][];
  isOwner: boolean;
  containerInfo: { userId: string; containerId: string };
}

export default function TableData({ isOwner, containerFiles, containerInfo }: ITableDataProps) {
  async function handleDeleteClick(filename: string, fileExtenstion: string) {
    const response = await deleteContainer(
      containerInfo.userId,
      containerInfo.containerId,
      `${filename}.${fileExtenstion}`,
    );

    if (!response) return;

    setFiles(files.filter((file) => file[0] !== filename && file[1] !== fileExtenstion));
  }

  const [files, setFiles] = useState(containerFiles);

  return (
    <>
      {files.map((file) => (
        <TableRow key={`${file[0]}.${file[1]}`} sx={{ "&:hover": { background: "$f2f2f2" } }}>
          <TableCell>{file[0]}</TableCell>
          <TableCell>{file[1]}</TableCell>
          <TableCell>
            <DownloadButton
              userId={containerInfo.userId}
              containerId={containerInfo.containerId}
              filename={`${file[0]}.${file[1]}`}
            >
              <FileDownload />
            </DownloadButton>
          </TableCell>
          {isOwner && (
            <TableCell>
              <Button color="error" onClick={() => handleDeleteClick(file[0], file[1])}>
                <Delete />
              </Button>
            </TableCell>
          )}
        </TableRow>
      ))}
    </>
  );
}
