import client from "@common/client";
import { ResCheck, ResControl, ResControls } from "./types";

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

export const checkControl = async (token: string) => {
  const res = await client.get<ResCheck>(`/control/check`, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

export const nextControl = async (token: string) => {
  const res = await client.patch<ResControl>(`/control/next`, null, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};

export const prevControl = async (token: string) => {
  const res = await client.patch<ResControl>(`/control/prev`, null, {
    headers: {
      authorization: token,
    },
  });

  return res.data;
};
