import express from 'express';
import * as boardController from '../controllers/board.js';

const router = express.Router();
router.get('/board/:id', boardController.getBoardWithComment);
router.put('/board/:id', boardController.increaseView);
router.get('/boards', boardController.getBoards);

export default router;
