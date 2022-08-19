import { setRoutes } from "@utils";
import Express from "express";

class PublicRoutes {
  routes: Express.Router;

  constructor() {
    this.routes = Express.Router();
    setRoutes.call(this, __dirname);
  }
}

export default new PublicRoutes().routes;
