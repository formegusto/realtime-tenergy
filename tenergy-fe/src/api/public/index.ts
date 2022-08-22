import { client } from "@api/client";
import { ResGetPublic, ResGetPublicById } from "./types";

const BASEPATH = "/public";

export const getPublic = async () =>
  (
    await client.get<ResGetPublic>(BASEPATH, {
      headers: {
        authorization: localStorage.getItem("token")!,
      },
    })
  ).data;

export const getPublicById = async (id: string) =>
  (
    await client.get<ResGetPublicById>(`${BASEPATH}/${id}`, {
      headers: {
        authorization: localStorage.getItem("token")!,
      },
    })
  ).data;
