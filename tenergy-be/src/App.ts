import Express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

class App {
  app: Express.Application;

  constructor() {
    this.app = Express();

    this.SetMW();
    this.SetRoutes();
  }

  SetMW() {
    this.app.use(cors());
  }

  SetRoutes() {}
  Start() {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
    this.app.listen(port, () => {
      console.log(`[ Express ] Start Server PORT ${port}`);
    });
  }
}

export default new App().Start();
