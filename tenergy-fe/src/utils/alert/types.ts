import { Alert } from "@store/types";

export interface FormProps {
  alert: Alert;
  onSelected: (id: string) => void;
}

export interface AlertProps {
  alerts: Alert[];
}
