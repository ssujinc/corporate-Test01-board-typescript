import express from 'express';
import { commentController } from '../controllers';

const router = express.Router();
router.post('/comment', commentController.createComment);

export default router;
