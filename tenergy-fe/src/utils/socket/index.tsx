import { connect, Socket } from "socket.io-client";
import { tokenState } from "@store/atom";
import React from "react";
import { useRecoilValue } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import changeControlEvent from "./changeControlEvent";
import AlertListener from "@utils/alert";
import { Alert } from "@store/types";

function SocketListener() {
  const [alerts, setAlerts] = React.useState<Alert[]>([]);
  const queryClient = useQueryClient();
  const token = useRecoilValue(tokenState);

  React.useEffect(() => {
    let io: Socket | null = null;
    if (token) {
      const API_SERVER = process.env.REACT_APP_API_SERVER;
      const SOCKET_PATH = process.env.REACT_APP_SOCKET_PATH;
      io = connect(`${API_SERVER}`, {
        path: SOCKET_PATH,
        transports: ["polling"],
        // only polling okay
        extraHeaders: {
          Authorization: token,
        },
      });

      io.on("connect", () => {
        console.log("io connected!");

        io!.on("change-control", () => {
          changeControlEvent(queryClient);
        });

        io!.on("new-trade-request", (args: Alert) => {
          setAlerts((prev) => [...prev, args]);
          queryClient.invalidateQueries(["getRequestQuery"]);
          queryClient.invalidateQueries(["getMyQuery"]);
        });

        io!.on("trade-establish", () => {
          changeControlEvent(queryClient);
        });
      });
    }

    return () => {
      if (io) {
        io!.disconnect();
      }
    };
  }, [token, queryClient]);

  React.useEffect(() => {}, []);

  return <AlertListener alerts={alerts} />;
}

export default SocketListener;
