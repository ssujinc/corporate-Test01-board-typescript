import { commentModels } from '../models';

const createComment = async (createCommentDto) => {
  await commentModels.createComment(createCommentDto);
};

export default { createComment }
