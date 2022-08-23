import React from "react";

interface Props<P> {
  modal: (args: P) => JSX.Element;
}

export function useModal<P>({
  modal,
}: Props<P>): [
  (args: P) => JSX.Element | null,
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
