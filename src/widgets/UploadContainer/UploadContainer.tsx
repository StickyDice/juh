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

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("data", reader.result);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
  });
};

export function UploadContainer() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const router = useRouter();
  const [switchChecked, setSwitchChecked] = useState(true);

  const [folderName, setFolderName] = useState<string>("Название папки");

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
    const files = [];
    for (const file of selectedFiles) {
      const base64File = await getBase64(file);
      files.push({ name: file.name, data: base64File });
    }
    const data = {
      files,
      title: "Название папки",
      viewers: [""],
    };
    const containerLink: string = await createContainer(data).then((res) => res.json());
    console.log(containerLink.replace("\\", ""));
    router.push(containerLink.replace("\\", ""));
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
              control={
                <Switch
                  checked={switchChecked}
                  onClick={() => setSwitchChecked(!switchChecked)}
                  inputProps={{
                    "aria-label": switchChecked
                      ? "Доступна всем"
                      : "Доступна всем, у кого есть ссылка",
                  }}
                />
              }
              label={
                <Typography color="secondary">
                  {switchChecked ? "Доступна всем" : "Доступна всем, у кого есть ссылка"}
                </Typography>
              }
            />
          </Stack>
          <LineDivider />
          <Stack className={styles.uploadedFilesTypographyContainer}>
            <Typography color="secondary">Название папки</Typography>
            <TextField
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Без названия"
              variant="standard"
            />
          </Stack>
          <Button variant="contained" onClick={onSubmit}>
            Загрузить
          </Button>
        </>
      )}
    </Stack>
  );
}
