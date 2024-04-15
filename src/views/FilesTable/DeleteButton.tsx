"use client";

import Delete from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

export function DeleteButton({ filename }: { filename: string }) {
  const handleDeleteAction = () => {
    // deleteContainer()
  };

  return (
    <IconButton>
      <Delete />
    </IconButton>
  );
}
