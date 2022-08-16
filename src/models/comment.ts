import prisma from '../prisma';

interface CreateCommentDto {
  userId: string,
  boardId: string,
  comment: string,
  parentId: string,
  depth: number,
}

const createComment = async (createCommentDto: CreateCommentDto) => {
  const { userId, boardId, comment, parentId, depth } = createCommentDto;
  const query = `
    INSERT INTO comment (
      user_id, 
      board_id, 
      contents
      ${parentId ? `, depth, parent_id` : ``}
    )
    VALUES (
      ${userId}, ${boardId}, "${comment}" 
      ${parentId ? `,${depth}, ${parentId}` : ``}
    );
  `;
  await prisma.$queryRawUnsafe(query);
};

const readComment = async (parentId: string) => {
  return await prisma.$queryRaw<{ depth: number }[]>`SELECT depth FROM comment WHERE id=${parentId}`;
}

export default { createComment, readComment };