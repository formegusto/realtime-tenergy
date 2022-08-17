import { RootContainer } from "@container";

export * from "./buyer";
export * from "./main";
export * from "./my";
export * from "./seller";
export * from "./public";
export * from "./auth";

export function RootScreen() {
  return <RootContainer />;
}
