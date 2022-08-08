import Express from "express";
import fs from "fs";
import path from "path";
import { setRoutes } from "../utils";

class Routes {
  routes: Express.Router;

  constructor() {
    this.routes = Express.Router();
    setRoutes.call(this, __dirname);
  }
}

export default new Routes().routes;
