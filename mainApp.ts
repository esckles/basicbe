import { Application, Request, Response } from "express";
import user from "./router/userRouter";
import post from "./router/postRouter";
export const mainApp = async (app: Application) => {
  try {
    app.use("/api", user);
    app.use("/api", post);

    app.get("/", (req: Request, res: Response) => {
      try {
        res.status(200).json({
          message: "Welcome to Friends App",
        });
      } catch (error) {
        res.status(404).json({
          message: "Error",
        });
      }
    });
  } catch (error) {
    return error;
  }
};
