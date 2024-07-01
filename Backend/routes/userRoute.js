import e from "express";
import { getUsers, updateProfile } from '../controllers/userController.js';
import protectRoute from "../middleware/protectRoute.js";
const router = e.Router();

router.get("/", protectRoute, getUsers);
router.put("/", protectRoute, updateProfile);

export default router;