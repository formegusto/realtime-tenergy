import { connect, Socket } from "socket.io-client";
import changeControlEvent from "./changeControlEvent";

function connection(token: string) {
  const API_SERVER = process.env.REACT_APP_API_SERVER;
  const SOCKET_PATH = process.env.REACT_APP_SOCKET_PATH;

  const io: Socket = connect(`${API_SERVER}`, {
    path: SOCKET_PATH,
    transports: ["polling"],
    // only polling okay
    extraHeaders: {
      Authorization: token,
    },
  });

  io.on("connect", () => {
    console.log("io connected !!");

    io.on("change-control", changeControlEvent);
  });

  return io;
}

export default connection;
