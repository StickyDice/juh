"use client";

import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { CookiesManagerClient } from "~/shared/lib/ClientCookiesManager";
import { UploadContainer } from "~/widgets/UploadContainer";

export function Upload() {
  const router = useRouter();
  return (
    <Stack>
      <IconButton
        sx={{
          position: "absolute",
          right: "8px",
          top: "8px",
        }}
        onClick={() => {
          CookiesManagerClient.remove(document.cookie);
          router.push("/");
        }}
      >
        <Logout></Logout>
      </IconButton>
      <UploadContainer />
    </Stack>
  );
}
