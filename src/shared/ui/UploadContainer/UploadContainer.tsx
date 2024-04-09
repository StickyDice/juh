"use client";

import Button from "@mui/material/Button";
import styles from "./upload-container.module.css";
import CloudUpload from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LineDivider from "~/shared/ui/LineDivider/LineDivider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { ChangeEvent, DragEvent, useState } from "react";

export default function UploadContainer() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleOnDrop = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) setSelectedFiles([...selectedFiles, e.dataTransfer.files[0]]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) setSelectedFiles([...selectedFiles, e.target.files[0]]);
  };

  const containerClassName = `${styles.smoothHeightChange} ${selectedFiles.length ? styles.uploadContainer : styles.uploadContainerEmpty}`;
  console.log(containerClassName);
  return (
    <Stack spacing={2} className={containerClassName}>
      <input
        onChange={handleInputChange}
        onDrop={handleOnDrop}
        className={styles.containerFileInput}
      />
      <Stack spacing={1} className={styles.styledStack}>
        <Typography color="secondary">Перетащите файлы сюда</Typography>
        <Typography color="secondary" className={styles.orTypography}>
          или
        </Typography>
        <Button variant="contained" className={styles.uploadButton} startIcon={<CloudUpload />}>
          <input type="file" className={styles.visuallyHiddenInput} onChange={handleInputChange} />
          Нажмите чтобы выбрать файл
        </Button>
      </Stack>
      {!!selectedFiles.length && (
        <>
          <LineDivider />
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
        </>
      )}
    </Stack>
  );
}
