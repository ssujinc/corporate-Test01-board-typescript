import { boardModels } from '../models/index.js';

export const getBoardWithComment = async (boardId, commentOffset, commentLimit) => {
  const existingBoard = await boardModels.getBoardByBoardId(boardId);
  if (!existingBoard) {
    const error = new Error('게시판이 존재하지 않습니다.');
    error.statusCode = 402;
    throw error;
  }
  return await boardModels.getBoardWithComment(boardId, commentOffset, commentLimit);
};

export const getBoards = async (keyword) => {
  const searchResult = await boardModels.getBoards(keyword);
  if (keyword.length === 0) {
    const error = new Error('검색어가 없습니다.');
    error.statusCode = 402;
    throw error;
  }
  if (searchResult.length === 0) {
    const error = new Error('검색 결과가 없습니다.');
    error.statusCode = 403;
    throw error;
  }
  return searchResult;
};

export const increaseView = async (boardId, userId) => {
  const existingUser = await boardModels.getUserById(boardId, userId);
  if (existingUser) {
    const view = Number((await boardModels.readView(boardId))[0].cnt);
    return view;
  }
  await boardModels.createView(boardId, userId);
  const view = Number((await boardModels.readView(boardId))[0].cnt);
  return view;
};
