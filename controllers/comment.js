import { commentService } from '../services/index.js';

export const createComment = async (req, res) => {
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
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};
