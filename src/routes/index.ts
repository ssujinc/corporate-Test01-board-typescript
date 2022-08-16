import express from 'express';
import { swaggerUi, specs } from '../modules/swagger';
import boardRouter from './board';
import commentRouter from './comment';

const router = express.Router();
router.use(boardRouter);
router.use(commentRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default router;