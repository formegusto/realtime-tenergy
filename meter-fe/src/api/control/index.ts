import client from "@common/client";
import { ResControl, ResControls } from "./types";

export const getControls = async () => {
  const res = await client.get<ResControls>("/control", {
    headers: {
      authorization: process.env.REACT_APP_ADMIN_REQUEST_KEY!,
    },
  });
  return res.data;
};

export const getControl = async (_id: string) => {
  const res = await client.get<ResControl>(`/control/${_id}`, {
    headers: {
      authorization: process.env.REACT_APP_ADMIN_REQUEST_KEY!,
    },
  });

  return res.data;
};
