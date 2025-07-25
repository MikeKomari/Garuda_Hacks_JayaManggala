import { Router } from "express";
import { chapterController } from "../controllers";


const chapterRouter = Router();

chapterRouter.get("/chapter", chapterController.getAllChapter);
chapterRouter.get("/chapter/:id", chapterController.getChapterById);
chapterRouter.post("/chapter", chapterController.createChapter);
chapterRouter.post("/delete/chapter/:id", chapterController.deleteChapter);
chapterRouter.post("/update/chapter/:id", chapterController.updateChapter);

export default chapterRouter;
