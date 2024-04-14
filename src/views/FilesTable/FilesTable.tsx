import { FileDownload, Delete } from "@mui/icons-material";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { deleteContainer } from "~/services/deleteContainer";
import "./files-table.module.css";

interface FilesTableProps {
  files: string[][];
  isOwner: boolean;
  containerInfo: {
    userId: string;
    containerId: string;
  };
}

export default function FilesTable({ files, isOwner, containerInfo }: FilesTableProps) {
  // TODO: Не уверен что хочу делать всю таблицу целиком client-side компонентом. Надо подумать

  async function handleDeleteClick(filename: string) {
    deleteContainer(containerInfo.userId, containerInfo.containerId, filename);
    // TODO: Дописать логику отображения изменений
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Название файла</TableCell>
          <TableCell sx={{ width: 120 }}>Расширение</TableCell>
          <TableCell sx={{ width: 56 }}></TableCell>
          {isOwner && <TableCell sx={{ width: 56 }}></TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {files.map((file) => (
          <TableRow key={`${file[0]}.${file[1]}`} sx={{ "&:hover": { background: "$f2f2f2" } }}>
            <TableCell>{file[0]}</TableCell>
            <TableCell>{file[1]}</TableCell>
            <TableCell>
              <IconButton>
                <FileDownload />
              </IconButton>
            </TableCell>
            {isOwner && (
              <TableCell>
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
