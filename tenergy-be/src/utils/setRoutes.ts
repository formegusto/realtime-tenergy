import { DefaultRoutes } from "../types/common";
import path from "path";
import fs from "fs";

export default async function setRoutes(this: DefaultRoutes, dir: string) {
  const routesDir = fs.readdirSync(path.resolve(dir));

  for (let fileName of routesDir) {
    if (fileName === "index.js") continue;

    const routesObj = await import(path.resolve(dir, fileName));
    const routesPath =
      "/" + fileName.includes(".js")
        ? fileName.replace(".js", "").toLowerCase()
        : fileName.toLowerCase();

    this.routes.use(routesPath, routesObj.default);
  }
}
