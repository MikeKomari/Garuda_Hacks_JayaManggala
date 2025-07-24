import { Router } from "express";
import authRouter from "./authRouter";

const router = Router();

router.get("/", (_, response) => {
  response.send({
    message: "Welcome API",
  });
});

router.use("/auth", authRouter);
export default router;
