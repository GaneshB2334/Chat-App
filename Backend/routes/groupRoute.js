import e from "express";
import { createGroup } from "../controllers/groupController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = e.Router();

router.post("/create", protectRoute, createGroup);

export default router;