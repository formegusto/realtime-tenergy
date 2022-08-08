import Express from "express";

class Control {
  routes: Express.Router;

  constructor() {
    this.routes = Express.Router();
    this.SetRoutes();
  }

  SetRoutes() {
    this.routes.get("/", (req: Express.Request, res: Express.Response) => {
      return res.send("hello");
    });
  }
}

export default new Control().routes;
