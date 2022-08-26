import { MonthMeterData } from "@models/types";
import { Socket } from "socket.io";
import { decryptToken, generateToken } from "../convert";

export default async function connection(socket: Socket) {
  console.log(`----[Tenergy.IO] Socket Connection :)----`);
  console.log(`token : ${socket.request.headers["authorization"]}`);
  const token = socket.request.headers["authorization"];

  if (token) {
    const {
      household: { name },
    } = decryptToken(token);
    console.log(name);

    await MonthMeterData.updateToken(name, socket.id);
  }

  socket.on("disconnect", () => {
    console.log(`----[Tenergy.IO] Socket DisConnection :)----`);
  });
}
