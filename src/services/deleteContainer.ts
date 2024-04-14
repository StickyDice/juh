import { cookies } from "next/headers";

export const deleteContainer = function (userId: string, containerId: string, filename?: string) {
  return fetch(
    `http://localhost:8000/users/${userId}/containers/${containerId}${
      filename ? `?filename=${encodeURIComponent(filename)}` : ""
    }`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { Cookie: cookies().toString() },
    },
  );
};
