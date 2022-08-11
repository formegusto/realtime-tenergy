import client from "@common/client";
import { ResControls } from "./types";

export const getControls = () =>
  client.get<ResControls>("/control", {
    headers: {
      authorization: process.env.ADMIN_REQUEST_KEY!,
    },
  });
