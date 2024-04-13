import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "filename",
    headerName: "Название папки",
    type: "string",
    width: 700,
  },
  {
    field: "extension",
    headerName: "Расширение",
    type: "string",
    width: 100,
  },
  {
    field: "downloadAction",
    headerName: "",
    width: 100,
  },
  {
    field: "removeAction",
    headerName: "",
    width: 100,
  },
];

export type RowType = {
  id: string;
  filename: string;
  extension: string;
  loadLink: string;
  removeLink?: string;
};

export function FilesTable({ rows }: { rows: RowType[] }) {
  return <DataGrid columns={columns} rows={rows}></DataGrid>;
}
