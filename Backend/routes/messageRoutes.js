import { Router } from 'express';
import { sendMessage,getMessages } from '../controllers/messageController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = Router();

router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);

export default router;