import { Router } from "express";
import { AuthController } from "../controllers";
import FeatureController from "../controllers/FeatureController";

const featureRouter = Router();

featureRouter.post(
  "/transcribe",
  FeatureController.upload.single("audio"),
  FeatureController.transcribeAudio
);

export default featureRouter;
