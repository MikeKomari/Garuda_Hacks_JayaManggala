import { Router } from "express";
import { AuthController } from "../controllers";
import vocabController from "../controllers/vocabController";

const vocabRouter = Router();

vocabRouter.get("/vocab", vocabController.getVocab);
vocabRouter.get("/vocab/:regionId", vocabController.getVocabByRegion);
vocabRouter.post("/vocab/create", vocabController.createVocab);
vocabRouter.post("/vocab/edit/:id", vocabController.editVocab);

export default vocabRouter;
