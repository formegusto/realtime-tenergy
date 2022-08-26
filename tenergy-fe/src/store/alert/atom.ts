import { atom } from "recoil";
import { Alert } from "./types";

export const alertsState = atom<Alert[]>({
  key: "alertsState",
  default: [],
});
