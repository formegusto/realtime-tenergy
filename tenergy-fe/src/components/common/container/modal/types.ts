export interface ModalProps {
  closeAction?: () => void;
}

export interface ConfirmModalProps {
  confirmAction?: () => void;
}

export interface QuantitySettingModalProps {
  id: string;
  initQuantity: number;
}

export interface QuantitySettingBlockProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}
