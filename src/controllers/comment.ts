import { Request, Response } from 'express';
import { commentService } from '../services';
import HttpError from '../common/httpError';

const createComment = async (req: Request<{}, {}, { userId: string, boardId: string, comment: string, parentId: string }, {}>, res: Response) => {
  try {
    const { boardId, userId, comment, parentId } = req.body;
    const createCommentDto = {
      userId,
      boardId,
      comment,
      parentId,
    };
    await commentService.createComment(createCommentDto);
    return res.status(200).json({ message: 'CREATE' });
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
};

export default { createComment };