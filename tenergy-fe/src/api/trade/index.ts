import { client } from "@api/client";
import QueryString from "qs";
import {
  ReqPatchRequest,
  RequestItem,
  ResGetSample,
  TradeRequest,
} from "./types";

const BASEPATH = "/trade";

export const getSample = async (query: TradeRequest) =>
  (
    await client.get<ResGetSample>(
      `${BASEPATH}/sample?${QueryString.stringify(query)}`,
      {
        headers: {
          authorization: localStorage.getItem("token")!,
        },
      }
    )
  ).data;

export const postRequest = async (body: TradeRequest) =>
  (
    await client.post(`${BASEPATH}`, body, {
      headers: {
        authorization: localStorage.getItem("token")!,
      },
    })
  ).data;

export const getRequests = async () =>
  (
    await client.get<RequestItem[]>(`${BASEPATH}/request`, {
      headers: {
        authorization: localStorage.getItem("token")!,
      },
    })
  ).data;

export const patchRequest = async (body: ReqPatchRequest) =>
  await client.patch(`${BASEPATH}`, body, {
    headers: {
      authorization: localStorage.getItem("token")!,
    },
  });
