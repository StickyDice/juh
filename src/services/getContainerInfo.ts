import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export type ContainerInfo = {
  title: string;
  filenames: string[];
  isOwner: boolean;
};

export const getContainerInfo = function (userId: string, containerId: string) {
  return fetch(`http://localhost:8000/users/${userId}/containers/${containerId}`, {
    method: "GET",
    credentials: "include",
    headers: { Cookie: cookies().toString() },
  });
};
