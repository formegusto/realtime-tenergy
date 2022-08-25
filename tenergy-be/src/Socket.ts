import http from "http";
import express from "express";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { MonthMeterDataModel } from "./models";

function SocketConnect(server: http.Server, app: express.Application) {
  const io = new Server(server, {
    path: "/tenergy.io",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  app.set("io", io);
  io.on("connection", async (socket) => {
    console.log(`----[Alert.IO] Socket Connection :)----`);
    console.log(socket.request.headers["authorization"]);
    const token = socket.request.headers["authorization"]!;
    const secret = process.env.JWT_SECRET!;
    const { household } = jwt.verify(token, secret) as any;
    console.log(household);

    const monthMeterData = await MonthMeterDataModel.updateOne({
      name: household.name,
    });
    console.log(monthMeterData);

    socket.on("test", () => {
      console.log(socket.request.headers["authorization"]);
    });

    socket.on("disconnect", () => {
      console.log(`----[Alert.IO] Socket DisConnection :)----`);
    });
  });
}

export default SocketConnect;
