"use client";

import Button from "@mui/material/Button";
import styles from "./upload-container.module.css";
import CloudUpload from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LineDivider from "~/components/LineDivider/LineDivider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

export default function UploadContainer() {
  return (
    <Stack className={styles.uploadContainer} spacing={2}>
      <Stack spacing={1} className={styles.styledStack}>
        <Typography color="secondary">Перетащите файлы сюда</Typography>
        <Typography color="secondary" className={styles.orTypography}>
          или
        </Typography>
        <Button variant="contained" className={styles.uploadButton} startIcon={<CloudUpload />}>
          Нажмите чтобы выбрать файл
        </Button>
      </Stack>
      <LineDivider className={styles.fuckedStyledLineDivider} />
      <Stack className={styles.uploadedFilesTypographyContainer}>
        <Typography color="secondary">Загруженные файлы:</Typography>
        <Typography color="secondary">fil1.txt, file2.php, file3.cock</Typography>
      </Stack>
      <LineDivider />
      <Stack className={styles.uploadedFilesTypographyContainer}>
        <Typography color="secondary">Параметры</Typography>
        <FormControlLabel
          control={<Switch inputProps={{ "aria-label": "Доступна всем" }} />}
          label={<Typography color="secondary">Доступна всем</Typography>}
        />
      </Stack>
      <LineDivider />
      <Stack className={styles.uploadedFilesTypographyContainer}>
        <Typography color="secondary">Название папки</Typography>
        <TextField placeholder="Без названия" variant="standard" />
      </Stack>
    </Stack>
  );
}
