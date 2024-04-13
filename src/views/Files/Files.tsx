import { FilesTable, RowType } from "~/widgets/Files";

const fakedRows: RowType[] = [
  {
    id: "1",
    filename: "Папка",
    extension: ".doc",
    loadLink: "",
  },
  {
    id: "2",
    filename: "Мамка",
    extension: ".txt",
    loadLink: "",
  },
];

export function Files() {
  return <FilesTable rows={fakedRows} />;
}
