import { commentModels } from '../models';

export const createComment = async (createCommentDto) => {
  await commentModels.createComment(createCommentDto);
};
