import { client } from "../client";
import { ResCheck, ResLogin } from "./types";

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
