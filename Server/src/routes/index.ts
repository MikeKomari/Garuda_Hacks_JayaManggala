import { Router } from "express";
import authRouter from "./authRouter";
import regionRouter from "./regionRouter";

const router = Router();

router.get("/", (_, response) => {
  response.send({
    message: "Welcome API",
  });
});

router.use("/auth", authRouter);
router.use("/region", regionRouter);
export default router;
