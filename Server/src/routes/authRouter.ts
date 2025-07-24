import { Router } from "express";
import { AuthController } from "../controllers";

const authRouter = Router();

authRouter.post("/register", AuthController.registerUser);
authRouter.post("/login-google", AuthController.loginGoogle);

export default authRouter;
