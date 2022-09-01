import { atom } from "recoil";
import { Control } from "./types";
import { ResCheck } from "@api/control/types";

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: null,
});

export const nowState = atom<ResCheck | null>({
  key: "nowState",
  default: null,
});

export const selectedControlState = atom<Control | null>({
  key: "selectedControlState",
  default: null,
});
