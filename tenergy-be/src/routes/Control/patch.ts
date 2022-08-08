import Express from "express";
import { loginCheck } from "../../middlewares";

const routes: Express.Router = Express.Router();

routes.patch(
  "/next",
  loginCheck,
  (req: Express.Request, res: Express.Response) => {
    console.log(req.control);
    return res.send("Next Simulation");
  }
);

routes.patch(
  "/prev",
  loginCheck,
  (req: Express.Request, res: Express.Response) => {
    return res.send("Prev Simulation");
  }
);

export default routes;
