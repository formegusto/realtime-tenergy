import { client } from "@api/client";
import QueryString from "qs";

const BASEPATH = "/market";

export const getMarketStatus = async (quantity: number) =>
  await client.get(`${BASEPATH}?${QueryString.stringify({ quantity })}`, {
    headers: {
      authorization: localStorage.getItem("token")!,
    },
  });
