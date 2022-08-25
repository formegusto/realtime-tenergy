import http from "http";
import express from "express";
import { Server } from "socket.io";

function SocketConnect(server: http.Server, app: express.Application) {
  const io = new Server(server, {
    path: "/tenergy.io",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  app.set("io", io);
  io.on("connection", (socket) => {
    console.log(`----[Alert.IO] Socket Connection :)----`);
    console.log(socket);

    socket.on("disconnect", () => {
      console.log(`----[Alert.IO] Socket DisConnection :)----`);
    });
  });
}

export default SocketConnect;
