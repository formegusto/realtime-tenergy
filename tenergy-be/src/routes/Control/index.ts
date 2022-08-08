import Express from "express";
import { adminCheck } from "../../middlewares";
import setRoutes from "../../utils/setRoutes";

class Control {
  routes: Express.Router;

  constructor() {
    this.routes = Express.Router();
    this.routes.use(adminCheck);
    setRoutes.call(this, __dirname);
  }
}

export default new Control().routes;
