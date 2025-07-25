import { Router } from "express";
import authRouter from "./authRouter";
import regionRouter from "./regionRouter";
import storyRouter from "./storyRouter";
import vocabRouter from "./vocabRouter";
import featureRouter from "./featureRouter";
import questionRouter from "./questionRouter";
import vocalRouter from "./vocalRouter";

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
router.use("/question", questionRouter);
router.use("/vocal", vocalRouter);
export default router;
