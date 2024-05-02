"use server";

import { Card, Typography } from "@mui/material";
import { deleteCookie } from "cookies-next";
import { notFound, redirect } from "next/navigation";
import { ContainerInfo, getContainerInfo } from "~/services/getContainerInfo";
import styles from "./styles.module.css";
import FilesTable from "~/views/FilesTable";
import DownloadButton from "~/views/FilesTable/DownloadButton";
import DeleteButton from "~/views/FilesTable/DeleteButton";

type Props = {
  params: { userId: string; containerId: string };
};
export default async function Page({ params }: Props) {
  async function getData() {
    const res = await getContainerInfo(params.userId, params.containerId);
    if (res.status === 401) {
      deleteCookie("jwt");
      // TODO: Добавить что-то типа history.pushState
      redirect("/auth");
    } else if (res.status === 404) {
      notFound();
    }

    return await res.json();
  }

  const data: ContainerInfo = await getData();

  const files: string[][] = data.filenames.map((filename) => {
    const splits = filename.split(".");
    if (splits.length === 1) return [splits[0], ""];
    else return [splits.slice(0, -1).join("."), splits.pop() as string];
  });

  return (
    <Card sx={{ py: 2, minWidth: "30vw", maxWidth: "90vw", width: "100%" }}>
      <div className={styles.headerContainer}>
        <Typography variant="h6" sx={{ fontWeight: "600" }}>
          {data.title}
        </Typography>
        <div className={styles.headerButtons}>
          <DownloadButton userId={params.userId} containerId={params.containerId}>
            <Typography>Скачать папку</Typography>
          </DownloadButton>
          {data.isOwner && (
            <DeleteButton userId={params.userId} containerId={params.containerId}>
              <Typography>Удалить папку</Typography>
            </DeleteButton>
          )}
        </div>
      </div>
      <FilesTable
        files={files}
        isOwner={data.isOwner}
        containerInfo={{
          userId: params.userId,
          containerId: params.containerId,
        }}
      />
    </Card>
  );
}
