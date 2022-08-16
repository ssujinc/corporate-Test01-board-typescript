import { Request, Response, NextFunction } from 'express';
import { boardService } from '../services';

const getBoardWithComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const boardId = req.params.id;
    const commentOffset = req.query.offset;
    const commentLimit = req.query.limit;
    if (typeof commentOffset === "string" && typeof commentLimit === "string") {
      const readBoard = await boardService.getBoardWithComment(boardId, commentOffset, commentLimit);
      return res.status(200).json(readBoard);
    }
  } catch (error) {
    next(error);
    // return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getBoards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { keyword } = req.query;
    if (typeof keyword === "string") {
      const searchResult = await boardService.getBoards(keyword);
      return res.status(200).json(searchResult);
    }
  } catch (error) {
    next(error);
    // return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const increaseView = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const boardId = req.params.id;
    const { userId } = req.body;
    const view = await boardService.increaseView(boardId, userId);
    return res.status(200).json(view);
  } catch (error) {
    next(error);
    // return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export default { getBoardWithComment, getBoards, increaseView };