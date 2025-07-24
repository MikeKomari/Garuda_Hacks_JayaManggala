import express from "express";
import cors from "cors";
import router from "./routes";
import { AppError } from "./utils/http/AppError";
import { STATUS } from "./utils/http/statusCodes";
import { ErrorController } from "./controllers";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.use("*", (_, __, next) => {
  next(new AppError("Route not found", STATUS.NOT_FOUND));
});

app.use(ErrorController);

export default app;
