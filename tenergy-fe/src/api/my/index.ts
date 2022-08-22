import { client } from "@api/client";
import { ResGetMy } from "./types";

const BASEPATH = "/my";

export const getMy = async () =>
  (
    await client.get<ResGetMy>(BASEPATH, {
      headers: {
        authorization: localStorage.getItem("token")!,
      },
    })
  ).data;
