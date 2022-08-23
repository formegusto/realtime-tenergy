import { Distribution, Price, ResGetMy } from "@api/types";

export interface InformationProps {
  listOpen: () => void;
  infoOpen: () => void;

  kwh?: number;
  price?: Price;
  distribution?: Distribution;
}

export interface MyComponentProps {
  data: ResGetMy;
}
