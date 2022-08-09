import Express from "express";
import { setRoutes } from "@utils";

class Routes {
  routes: Express.Router;

  constructor() {
    this.routes = Express.Router();
    setRoutes.call(this, __dirname);
  }
}

export default new Routes().routes;
