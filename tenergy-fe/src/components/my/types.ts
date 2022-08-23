import { Distribution, Meter, Price, ResGetMy } from "@api/types";

export interface InformationProps {
  listOpen: () => void;
  infoOpen: () => void;

  meter?: Meter;
  price?: Price;
  distribution?: Distribution;
}

export interface MyComponentProps {
  data: ResGetMy;
}
