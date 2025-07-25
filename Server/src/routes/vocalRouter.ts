import { Router } from "express";
import vocalController from "../controllers/vocalController";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

const vocalRouter = Router();

vocalRouter.post(
  "/checkVocal",
  upload.single("audio"),
  vocalController.checkPronounciation
);

export default vocalRouter;
