import { DefaultRoutes } from "../types/common";
import path from "path";
import fs from "fs";

export async function setRoutes(this: DefaultRoutes, dir: string) {
  const routesDir = fs.readdirSync(path.resolve(dir));

  for (let fileName of routesDir) {
    if (fileName === "index.js" || fileName === "error.js") continue;

    const routesObj = await import(path.resolve(dir, fileName));
    const routes = routesObj.default;
    const routesPath = "/" + fileName.toLowerCase();

    fileName.includes(".js")
      ? this.routes.use(routes)
      : this.routes.use(routesPath, routes);

    // this.routes.use(routesPath, routesObj.default);
  }
}