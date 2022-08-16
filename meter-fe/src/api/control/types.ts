import { APT, Control } from "@store/types";

export type ResControls = {
  controls: Control[];
};

export type ResControl = {
  token: string;
};

export type ResCheck = {
  control: Control;
  APT: APT;
};
