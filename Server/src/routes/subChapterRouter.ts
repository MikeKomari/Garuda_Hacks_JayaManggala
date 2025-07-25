import { Router } from "express";
import { subChapterController } from "../controllers";


const subChapterRouter = Router();

subChapterRouter.get("/subchapter", subChapterController.getAllSubChapters);
subChapterRouter.get("/subchapter/:id", subChapterController.getSubChapterById);
subChapterRouter.post("/subchapter", subChapterController.createSubChapter);
subChapterRouter.post(
  "/delete/subchapter/:id",
  subChapterController.deleteSubChapter
);
subChapterRouter.post(
  "/update/subchapter/:id",
  subChapterController.updateSubChapter
);

export default subChapterRouter;
