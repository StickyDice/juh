"use client";

import Button from "@mui/material/Button";
import { ReactNode } from "react";
import { downloadContainer } from "~/services/downloadContainer";

interface IDownloadButtonProps {
  userId: string;
  containerId: string;
  filename?: string;
  children: ReactNode;
}

export default function DownloadButton({
  userId,
  containerId,
  filename,
  children,
}: IDownloadButtonProps) {
  const handleDownloadContainerClick = () => {
    downloadContainer(userId, containerId, filename);
  };

  return (
    <Button color="primary" onClick={handleDownloadContainerClick}>
      {children}
    </Button>
  );
}
