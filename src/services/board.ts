import { boardModels } from '../models';

const getBoardWithComment = async (boardId: string, commentOffset: string, commentLimit: string) => {
  const existingBoard = await boardModels.getBoardByBoardId(boardId);
  if (!existingBoard) {
    const error = new Error('게시판이 존재하지 않습니다.');
    // error.statusCode = 402;
    throw error;
  }
  return await boardModels.getBoardWithComment(boardId, commentOffset, commentLimit);
};

const getBoards = async (keyword: string) => {
  const searchResult: any = await boardModels.getBoards(keyword);
  if (keyword.length === 0) {
    const error = new Error('검색어가 없습니다.');
    // error.statusCode = 402;
    throw error;
  }
  if (searchResult.length === 0) {
    const error = new Error('검색 결과가 없습니다.');
    // error.statusCode = 403;
    throw error;
  }
  return searchResult;
};

const increaseView = async (boardId: string, userId: string) => {
  const existingUser = await boardModels.getUserById(boardId, userId);
  if (existingUser) {
    const boardIdId: any = await boardModels.readView(boardId);
    const view = Number(boardIdId[0].cnt);
    return view;
  }
  await boardModels.createView(boardId, userId);
  const boardIdId: any = await boardModels.readView(boardId);
  const view = Number(boardIdId[0].cnt);
  return view;
};

export default { getBoardWithComment, getBoards, increaseView };