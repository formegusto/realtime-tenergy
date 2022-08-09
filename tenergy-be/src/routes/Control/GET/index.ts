import Express from "express";
import { adminCheck } from "@mw";

const routes: Express.Router = Express.Router();

routes.get("/", adminCheck, (req: Express.Request, res: Express.Response) => {
  return res.send("Get Control Config");
});

export default routes;
