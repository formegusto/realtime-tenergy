import { MyContainer } from "@container";
import { blue } from "@styles/colors";
import { themeBackgroundChange } from "@utils";
import React from "react";

export function MyScreen() {
  React.useEffect(() => {
    themeBackgroundChange(blue[500]!);

    return () => {
      themeBackgroundChange("");
    };
  }, []);
  return <MyContainer />;
}
