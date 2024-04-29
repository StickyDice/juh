export const deleteContainer = function (userId: string, containerId: string, filename?: string) {
  return fetch(
    `http://localhost:8000/users/${userId}/containers/${containerId}${
      filename ? `?filename=${encodeURIComponent(filename)}` : ""
    }`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((response) => response.json());
};
