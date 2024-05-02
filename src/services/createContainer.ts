"use client";

type FileDTOType = {
  files: {
    name: string;
    data: string;
  }[];
  title: string;
  viewers: string[] | string;
};

export const createContainer = (files: FileDTOType) => {
  return fetch("http://localhost:8000/containers/create", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(files),
  });
};
