import { Router } from "express";
import authRouter from "./authRouter";
import regionRouter from "./regionRouter";
import storyRouter from "./storyRouter";
import vocabRouter from "./vocabRouter";
import featureRouter from "./featureRouter";

const router = Router();

router.get("/", (_, response) => {
  response.send({
    message: "Welcome API",
  });
});

router.use("/auth", authRouter);
router.use("/region", regionRouter);
router.use("/story", storyRouter);
router.use("/vocab", vocabRouter);
router.use("/feature", featureRouter);
export default router;
