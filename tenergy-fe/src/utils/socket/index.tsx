import { tokenState } from "@store/atom";
import React from "react";
import { useRecoilValue } from "recoil";
import connection from "./connection";

function SocketListener() {
  const token = useRecoilValue(tokenState);

  React.useEffect(() => {
    if (token) connection(token);
  }, [token]);

  return <></>;
}

export default SocketListener;
