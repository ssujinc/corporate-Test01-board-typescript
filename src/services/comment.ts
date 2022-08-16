import { commentModels } from '../models';

const createComment = async (createCommentDto: string) => {
  await commentModels.createComment(createCommentDto);
};

export default { createComment }
