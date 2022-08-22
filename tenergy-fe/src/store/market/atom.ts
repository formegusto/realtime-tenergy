import { atom } from "recoil";

export const quantityState = atom<number>({
  key: "quantityState",
  default: 30,
});
