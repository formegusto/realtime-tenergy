import { client } from "@api/client";
import QueryString from "qs";
import { ResGetBuyers, ResGetMarketStatus, ResGetSellers } from "./types";

const BASEPATH = "/market";

export const getMarketStatus = async (quantity: number) =>
  (
    await client.get<ResGetMarketStatus>(
      `${BASEPATH}?${QueryString.stringify({ quantity })}`,
      {
        headers: {
          authorization: localStorage.getItem("token")!,
        },
      }
    )
  ).data;

export const getSellers = async () =>
  (
    await client.get<ResGetSellers>(`${BASEPATH}/seller`, {
      headers: {
        authorization: localStorage.getItem("token")!,
      },
    })
  ).data;

export const getBuyers = async (quantity: number) =>
  (
    await client.get<ResGetBuyers>(
      `${BASEPATH}/buyer?${QueryString.stringify({ quantity })}`,
      {
        headers: {
          authorization: localStorage.getItem("token")!,
        },
      }
    )
  ).data;
