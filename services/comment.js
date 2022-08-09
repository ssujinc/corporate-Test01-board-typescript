import { commentModels } from '../models/index.js';

export const createComment = async (createCommentDto) => {
  await commentModels.createComment(createCommentDto);
};
