export const searchFilter = (keyword) => {
  const searchColumn = ['board.title', 'board.contents', 'user.nickname', 'c.commentContent'];
  const conditions = searchColumn.map((column) => `${column} LIKE '%${keyword}%'`);
  return `(${conditions.join(' OR ')})`;
};
