export const deleteContainer = function (
  userId: string,
  containerId: string,
  cookie: string,
  filename?: string,
) {
  console.log("cookie", cookie);
  return fetch(
    `http://localhost:8000/users/${userId}/containers/${containerId}${
      filename ? `?filename=${encodeURIComponent(filename)}` : ""
    }`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { Cookie: cookie },
    },
  );
};
