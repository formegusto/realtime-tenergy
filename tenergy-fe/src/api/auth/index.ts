import { client } from "../client";
import { ResLogin } from "./types";

const BASEPATH = "/auth";

export const login = async (name: string) =>
  (await client.post<ResLogin>(BASEPATH, { name })).data;
