import { Request, Response } from 'express';
import { boardService } from '../services';
import HttpError from '../common/httpError';

const getBoardWithComment = async (req: Request<{ id: string }, {}, {}, { offset: string, limit: string }>, res: Response) => {
  try {
    const boardId = req.params.id;
    const commentOffset = req.query.offset;
    const commentLimit = req.query.limit;
    const readBoard = await boardService.getBoardWithComment(boardId, commentOffset, commentLimit);
    return res.status(200).json(readBoard);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
};

const getBoards = async (req: Request<{}, {}, {}, { keyword: string }>, res: Response) => {
  try {
    const { keyword } = req.query;
    const searchResult = await boardService.getBoards(keyword);
    return res.status(200).json(searchResult);
  } catch (error) {
    if (error instanceof HttpError) {
      console.log(error)
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
};

const increaseView = async (req: Request<{ id: string }, {}, { userId: string }, {}>, res: Response) => {
  try {
    const boardId = req.params.id;
    const { userId } = req.body;
    const view = await boardService.increaseView(boardId, userId);
    return res.status(200).json(view);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
};

export default { getBoardWithComment, getBoards, increaseView };