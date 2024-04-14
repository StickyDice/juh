export const createContainer = (files: FormData) => {
  return fetch("http://localhost:8000/containers/create", {
    method: "POST",
    credentials: "include",
    // headers: { Cookie: cookies().toString() },
    body: JSON.stringify(files),
  });
};
