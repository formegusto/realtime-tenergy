import React from "react";

export type AuthProps = {
  navigateLogin: () => void;
};

export type LoginProps = {
  onSubmit: (e: React.FormEvent) => void;
  changeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
