"use client";

import Button from "@mui/material/Button";
import styles from "./upload-container.module.css";
import CloudUpload from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { ChangeEvent, DragEvent, MouseEvent, useState } from "react";
import { reachFilesFromDataTransfer } from "~/shared/utils/reachFilesFromDataTransfer";
import { LineDivider } from "~/shared/ui";
import { useRouter } from "next/navigation";
import { createContainer } from "~/services/createContainer";

export function UploadContainer() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const router = useRouter();

  const handleOnDrop = async (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files: File[] = [];
    for (let i = 0; i < e.dataTransfer.items.length; i++) {
      const item = e.dataTransfer.items[i];
      if (item.kind !== "file") continue;

      const uploaded: File[] = await reachFilesFromDataTransfer(item);
      files.push(...uploaded);
    }

    if (e.dataTransfer.files) setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;

    const uploaded: File[] = [];
    for (let i = 0; i < e.target.files.length; i++) uploaded.push(e.target.files[i]);
    setSelectedFiles([...selectedFiles, ...uploaded]);
  };

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const data = new FormData();
    selectedFiles.forEach((file) => data.append(file.name, file));
    const containerLink = await createContainer(data).then((res) => res.json());
    router.push(containerLink);
  };

  const containerClassName = `${styles.smoothHeightChange} ${selectedFiles.length ? styles.uploadContainer : styles.uploadContainerEmpty}`;
  return (
    <Stack spacing={2} className={containerClassName}>
      <input
        onChange={handleInputChange}
        onDrop={handleOnDrop}
        className={styles.containerFileInput}
        multiple
      />
      <Stack spacing={1} className={styles.styledStack}>
        <Typography color="secondary">Перетащите файлы сюда</Typography>
        <Typography color="secondary" className={styles.orTypography}>
          или
        </Typography>
        <Button variant="contained" className={styles.uploadButton} startIcon={<CloudUpload />}>
          <input
            type="file"
            className={styles.visuallyHiddenInput}
            onChange={handleInputChange}
            multiple
          />
          Нажмите чтобы выбрать файл
        </Button>
      </Stack>
      {!!selectedFiles.length && (
        <>
          <LineDivider />
          <Stack className={styles.uploadedFilesTypographyContainer}>
            <Typography color="secondary">Загруженные файлы:</Typography>
            <Typography color="secondary">
              {selectedFiles.map((file) => file.name).join(", ")}
            </Typography>
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
          <Button variant="contained" onClick={onSubmit}>
            Загрузить
          </Button>
        </>
      )}
    </Stack>
  );
}
