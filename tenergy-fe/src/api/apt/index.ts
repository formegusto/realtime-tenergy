import { client } from "@api/client";
import { ResGetAPT } from "./types";

const BASEPATH = "/apt";

export const getAPT = async () =>
  (
    await client.get<ResGetAPT>(BASEPATH, {
      headers: {
        authorization: localStorage.getItem("token")!,
      },
    })
  ).data;
