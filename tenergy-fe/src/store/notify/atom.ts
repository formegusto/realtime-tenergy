import { atom } from "recoil";
import { Socket } from "socket.io-client";

export const ioState = atom<Socket | null>({
  key: "ioState",
  default: null,
});
