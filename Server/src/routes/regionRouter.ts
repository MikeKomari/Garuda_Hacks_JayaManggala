import { Router } from "express";
import RegionController from "../controllers/RegionController";

const regionRouter = Router();

regionRouter.get("/region", RegionController.getRegions);
regionRouter.post("/region", RegionController.createRegion);
regionRouter.post("/region/update/:id", RegionController.editRegion);
regionRouter.post("/region/delete/:id", RegionController.deleteRegion);

export default regionRouter;
