import { Router } from "express";
import { StoryController } from "../controllers";


const storyRouter = Router();

storyRouter.get("/story", StoryController.getStory);
storyRouter.get("/story/:id", StoryController.getStoryById);
storyRouter.post("/story", StoryController.createStory);
storyRouter.post("/story/update/:id", StoryController.editStory);
storyRouter.post("/story/delete/:id", StoryController.deleteStory);

export default storyRouter;
