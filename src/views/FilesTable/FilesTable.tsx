import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import "./files-table.module.css";
import TableData from "~/views/FilesTable/TableData";
import { cookies } from "next/headers";

interface FilesTableProps {
  files: string[][];
  isOwner: boolean;
  containerInfo: {
    userId: string;
    containerId: string;
  };
}

export default function FilesTable({ files, isOwner, containerInfo }: FilesTableProps) {
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
        <TableData
          containerFiles={files}
          isOwner={isOwner}
          containerInfo={containerInfo}
          cookie={cookies().toString()}
        />
      </TableBody>
    </Table>
  );
}
