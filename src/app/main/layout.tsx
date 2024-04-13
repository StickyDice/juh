"use client";

import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import UploadContainer from "~/shared/ui/UploadContainer/UploadContainer";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

export default function Layout() {
  const router = useRouter();
  console.log("Cookies", document.cookie);
  return (
    <Stack>
      <IconButton
        sx={{
          position: "absolute",
          right: "8px",
          top: "8px",
        }}
        onClick={() => {
          router.push("/");
        }}
      >
        <Logout></Logout>
      </IconButton>
      <UploadContainer />
    </Stack>
  );
}
