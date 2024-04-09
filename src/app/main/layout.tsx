import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import UploadContainer from "~/shared/ui/UploadContainer/UploadContainer";
import Stack from "@mui/material/Stack";

export default function Layout() {
  return (
    <Stack>
      <IconButton
        sx={{
          position: "absolute",
          right: "8px",
          top: "8px",
        }}
      >
        <Logout></Logout>
      </IconButton>
      <UploadContainer />
    </Stack>
  );
}
