import prisma from '../prisma/index.js';

export const createComment = async (createCommentDto) => {
  const { userId, boardId, comment, parentId } = createCommentDto;
  let depth;
  if (parentId !== undefined) {
    let pdepth = await prisma.$queryRaw`SELECT depth FROM comment WHERE id=${parentId}`;
    depth = Number(pdepth[0].depth) + 1;
  } else {
    depth = 0;
  }
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
