import prisma from '../prisma/index.js';
import { searchFilter } from './util.js';

export const getBoardByBoardId = async (boardId) => {
  const [existingBoard] = await prisma.$queryRaw`
    SELECT * FROM board
    WHERE id=${boardId}
  `;
  return existingBoard;
};

export const getBoardWithComment = async (boardId, commentOffset, commentLimit) => {
  const start = (commentOffset - 1) * commentLimit;

  return await prisma.$queryRawUnsafe(`
  SELECT
    b.id,
    b.user_id,
    user.nickname,
    b.title,
    b.contents,
    ( 
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT("parent_id",cc.parent_id,"nickname",uu.nickname,"comment",cc.contents)) AS comt
      FROM ( 
        SELECT
        *
        FROM comment 
        ORDER BY creatred_at
        ${start ? `LIMIT ${start}, ${commentLimit}` : `LIMIT 0, ${commentLimit}`}
      ) AS cc 
      LEFT JOIN user AS uu ON cc.user_id=uu.id
      WHERE cc.board_id=${boardId}
  ) AS board_comment
  FROM board AS b
  LEFT JOIN (
    SELECT
    *
    FROM comment 
  ) AS c ON b.id = c.board_id
  LEFT JOIN user AS u ON c.user_id = u.id
  LEFT JOIN user ON b.user_id = user.id
  WHERE b.id= ${boardId}
  GROUP BY b.id
  `);
};

export const getBoards = async (keyword) => {
  return await prisma.$queryRawUnsafe(`
    SELECT
      board.id,
      board.title AS boardTitle,
      board.contents AS boardContent,
      user.nickname AS userName,
      c.commentContent,
      category.category
    FROM board
    LEFT JOIN user ON board.user_id=user.id
    LEFT JOIN (
      SELECT
          comment.board_id,
          JSON_ARRAYAGG(user.nickname) AS userCommentNickname,
          JSON_ARRAYAGG(comment.contents) AS commentContent
      FROM comment
      JOIN user on user.id=comment.user_id
      GROUP BY comment.board_id
    ) AS c ON c.board_id=board.id
    LEFT JOIN category ON category.id=board.category_id
    WHERE ${searchFilter(keyword)}
  `);
};

export const getUserById = async (boardId, userId) => {
  const [existingUser] = await prisma.$queryRaw`
    SELECT * FROM view
    WHERE board_id=${boardId} AND user_id=${userId}
  `;
  return existingUser;
};

export const createView = async (boardId, userId) => {
  return await prisma.$queryRaw`
  INSERT INTO view (board_id, user_id)
  VALUES(${boardId}, ${userId})
  `;
};

export const readView = async (boardId) => {
  return await prisma.$queryRaw`
    SELECT COUNT(*) AS cnt FROM view WHERE board_id=${boardId}
  `;
};
