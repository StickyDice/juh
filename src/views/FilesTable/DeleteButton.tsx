"use client";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { deleteContainer } from "~/services/deleteContainer";

interface IRemoveButtonProps {
  userId: string;
  containerId: string;
  filename?: string;
  children: ReactNode;
}

export default function DeleteButton({
  userId,
  containerId,
  children,
  filename,
}: IRemoveButtonProps) {
  const router = useRouter();
  const handleDeleteContainerClick = () => {
    deleteContainer(userId, containerId, filename);
    if (!filename) router.push("/");
  };

  return (
    <Button color="error" onClick={handleDeleteContainerClick}>
      {children}
    </Button>
  );
}
