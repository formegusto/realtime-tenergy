import Express from "express";
import { setRoutes } from "@utils";

class Control {
  routes: Express.Router;

  constructor() {
    this.routes = Express.Router();
    setRoutes.call(this, __dirname);
  }
}

export default new Control().routes;
