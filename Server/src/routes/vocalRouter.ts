import { Router } from "express";
import vocalController from "../controllers/vocalController";
import multer from "multer";

const vocalRouter = Router();
const upload = multer({ dest: "uploads/" });

vocalRouter.post(
  "/checkVocal",
  upload.single("audio"),
  vocalController.checkPronounciation
);

export default vocalRouter;
