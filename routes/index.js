import express from 'express';
import { swaggerUi, specs } from '../modules/swagger.js';
import boardRouter from './board.js';
import commentRouter from './comment.js';

const router = express.Router();
router.use(boardRouter);
router.use(commentRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default router;
