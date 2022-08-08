import Express from "express";

const routes: Express.Router = Express.Router();

routes.get("/", (req: Express.Request, res: Express.Response) => {
  return res.send("Get Control Config");
});

export default routes;
