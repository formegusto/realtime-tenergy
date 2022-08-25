import { client } from "../client";
import { PatchAuthParams, ResCheck, ResLogin } from "./types";

const BASEPATH = "/auth";

export const login = async (name: string) =>
  (await client.post<ResLogin>(BASEPATH, { name })).data;

export const check = async (token: string) =>
  (
    await client.get<ResCheck>(BASEPATH, {
      headers: {
        authorization: token,
      },
    })
  ).data;

export const patchAuth = async (params: PatchAuthParams) =>
  (
    await client.patch<ResCheck>(
      `${BASEPATH}/${params.id}`,
      {
        quantity: params.quantity,
      },
      {
        headers: {
          authorization: localStorage.getItem("token")!,
        },
      }
    )
  ).data;
