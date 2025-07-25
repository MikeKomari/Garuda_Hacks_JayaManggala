import { Router } from "express";
import { questionController } from "../controllers";

const questionRouter = Router();

questionRouter.get("/question", questionController.getAllQuestion);
questionRouter.get("/question/:id", questionController.getQuestionById);
// questionRouter.get("/question/:id", questionController.getQuestionById);
questionRouter.post("/question", questionController.createQuestion);
questionRouter.post("/update/question/:id", questionController.updateQuestion);
questionRouter.post("/delete/question/:id", questionController.deleteQuestion);

export default questionRouter;
