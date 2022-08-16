import { atom } from "recoil";
import { Control } from "./types";

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: null,
});

export const selectedControlState = atom<Control | null>({
  key: "selectedControlState",
  default: null,
});
