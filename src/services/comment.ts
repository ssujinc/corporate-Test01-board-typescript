import { commentModels } from '../models';

interface CreateCommentDto {
  userId: string,
  boardId: string,
  comment: string,
  parentId: string,
}

const createComment = async (createCommentDto: CreateCommentDto) => {
  const comment = await commentModels.readComment(createCommentDto.parentId);
  const depth = comment.length > 0 ? comment[0].depth + 1 : 0;
  await commentModels.createComment({ ...createCommentDto, depth });
};

export default { createComment }
