import express from 'express';
import { boardController } from '../controllers';

const router = express.Router();
router.get('/board/:id', boardController.getBoardWithComment);
router.put('/board/:id', boardController.increaseView);
router.get('/boards', boardController.getBoards);

export default router;
