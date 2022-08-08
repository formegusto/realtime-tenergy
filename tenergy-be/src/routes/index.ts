import Express from "express";
import fs from "fs";
import path from "path";

class Routes {
  routes: Express.Router;

  constructor() {
    this.routes = Express.Router();
    this.SetRoutes();
  }

  async SetRoutes() {
    const routesDir = fs.readdirSync(path.resolve(__dirname));

    for (let file of routesDir) {
      if (file === "index.js") continue;
      const routesObj = await import(path.resolve(__dirname, file));
      const routesPath = "/" + file.toLowerCase();

      this.routes.use(routesPath, routesObj.default);
    }
  }
}

export default new Routes().routes;
