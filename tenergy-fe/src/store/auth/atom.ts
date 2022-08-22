import { Household } from "@api/types";
import { atom } from "recoil";

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: null,
});

export const householdState = atom<Household | null>({
  key: "householdState",
  default: null,
});
