import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import MUILink from "@mui/material/Link";
import Link from "next/link";

export default function NotFound() {
  return (
    <Card sx={{ padding: 2, minWidth: "30vw" }}>
      <Typography variant="h5" align="center">
        Страница не найдена
      </Typography>
      <MUILink align="center" component="p" sx={{ marginTop: 2, fontSize: 18 }}>
        <Link href="/"> На главную </Link>
      </MUILink>
    </Card>
  );
}
