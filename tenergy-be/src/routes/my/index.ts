import { setRoutes } from "@utils";
import Express from "express";

class MyRoutes {
  routes: Express.Router;

  constructor() {
    this.routes = Express.Router();
    setRoutes.call(this, __dirname);
  }
}

export default new MyRoutes().routes;
