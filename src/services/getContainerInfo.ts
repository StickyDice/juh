import { cookies } from "next/headers";

export type ContainerInfo = {
  title: string;
  filenames: string[];
  isOwner: boolean;
};

export const getContainerInfo = function (userId: string, containerId: string) {
  return fetch(
    `http://localhost:8000/users/${encodeURIComponent(userId)}/containers/${encodeURIComponent(containerId)}`,
    {
      method: "GET",
      credentials: "include",
      headers: { Cookie: cookies().toString() },
    },
  );
};
