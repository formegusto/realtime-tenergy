import { client } from "@api/client";

const BASEPATH = "/public";

export const getPublic = async () =>
  (
    await client.get(BASEPATH, {
      headers: {
        authorization: localStorage.getItem("token")!,
      },
    })
  ).data;

export const getPublicById = async (id: string) =>
  (
    await client.get(`${BASEPATH}/${id}`, {
      headers: {
        authorization: localStorage.getItem("token")!,
      },
    })
  ).data;
