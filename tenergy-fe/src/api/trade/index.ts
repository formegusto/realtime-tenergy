import { client } from "@api/client";
import QueryString from "qs";
import { TradeRequest } from "./types";

const BASEPATH = "/trade";

export const getSample = async (query: TradeRequest) =>
  (
    await client.get(`${BASEPATH}/sample?${QueryString.stringify(query)}`, {
      headers: {
        authorization: localStorage.getItem("token")!,
      },
    })
  ).data;
