import env from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import { dbConfig } from "./utils/dbConfig";
import { mainApp } from "./mainApp";

env.config();
const app: Application = express();
app.use(express.json());
app.use(cors());

mainApp(app);
app.listen(process.env.PORT, () => {
  dbConfig();
});
