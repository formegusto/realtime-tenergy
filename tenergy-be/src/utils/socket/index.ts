import http from "http";
import express from "express";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { MonthMeterDataModel } from "@models";
import connection from "./connection";

// simulation 변화 알림용 소켓
export function SocketConnect(server: http.Server, app: express.Application) {
  const io = new Server(server, {
    path: "/tenergy.io",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  app.set("io", io);
  io.on("connection", connection);
}

export default SocketConnect;
