import "module-alias/register";
import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import http from "http";

import { init } from "@models/connect";
import routes from "@routes";
import errorHandler from "@routes/error";
import SocketConnect from "./Socket";

dotenv.config();

class App {
  server: http.Server;
  app: Express.Application;

  constructor() {
    this.app = Express();

    this.SetMW();
    this.SetRoutes();

    this.server = http.createServer(this.app);
  }

  SetMW() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(Express.json());
  }

  SetRoutes() {
    this.app.use(routes);
    this.app.use(errorHandler);
  }

  async Start() {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
    this.server.listen(port, () => {
      console.log(`[ Express ] Start Server PORT ${port}`);
    });

    const dbDrop = process.env.DB_DROP ? process.env.DB_DROP === "true" : false;
    console.log(dbDrop);

    await init({ drop: dbDrop });
    SocketConnect(this.server, this.app);
  }
}

export default new App().Start();
