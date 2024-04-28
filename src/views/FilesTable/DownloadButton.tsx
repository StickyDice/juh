"use client";

import Button from "@mui/material/Button";
import { ReactNode } from "react";
import { downloadContainer } from "~/services/downloadContainer";

interface IDownloadButtonProps {
  userId: string;
  containerId: string;
  children: ReactNode;
}

export default function DownloadButton({ userId, containerId, children }: IDownloadButtonProps) {
  const handleDownloadContainerClick = () => {
    downloadContainer(userId, containerId);
  };

  return (
    <Button color="primary" onClick={handleDownloadContainerClick}>
      {children}
    </Button>
  );
}
