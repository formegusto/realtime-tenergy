import React from "react";

type Props = {
  modal: (args: any) => JSX.Element;
};

export function useModal({
  modal,
}: Props): [
  (args: any) => JSX.Element | null,
  boolean,
  () => void,
  () => void
] {
  const [isOpen, setOpen] = React.useState<boolean>(false);

  const open = React.useCallback(() => {
    setOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setOpen(false);
  }, []);

  return [isOpen ? modal : () => null, isOpen, open, close];
}
