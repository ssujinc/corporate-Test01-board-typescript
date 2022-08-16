import { Request, Response, NextFunction } from 'express';
import { commentService } from '../services';

const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId, userId, comment, parentId } = req.body;
    const createCommentDto: any = {
      userId,
      boardId,
      comment,
      parentId,
    };
    await commentService.createComment(createCommentDto);
    return res.status(200).json({ message: 'CREATE' });
  } catch (error) {
    next(error);
    // return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export default { createComment };