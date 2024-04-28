"use client";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { deleteContainer } from "~/services/deleteContainer";

interface IRemoveButtonProps {
  userId: string;
  containerId: string;
  cookie: string;
  filename?: string;
  children: ReactNode;
}

export default function DeleteButton({
  userId,
  containerId,
  cookie,
  children,
}: IRemoveButtonProps) {
  const router = useRouter();
  const handleDeleteContainerClick = () => {
    deleteContainer(userId, containerId, cookie);
    router.push("/");
  };

  return (
    <Button color="error" onClick={handleDeleteContainerClick}>
      {children}
    </Button>
  );
}
