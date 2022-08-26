import { Socket } from "socket.io";

export default async function connection(socket: Socket) {
  console.log(`----[Tenergy.IO] Socket Connection :)----`);

  socket.on("disconnect", () => {
    console.log(`----[Tenergy.IO] Socket DisConnection :)----`);
  });
}
