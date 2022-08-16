import { boardModels } from '../models';

const getBoardWithComment = async (boardId: string, commentOffset: string, commentLimit: string) => {
  const existingBoard = await boardModels.getBoardByBoardId(boardId);
  if (!existingBoard) {
    const error = new Error('게시판이 존재하지 않습니다.');
    // error.statusCode = 402;
    return error;
  }
  return await boardModels.getBoardWithComment(boardId, commentOffset, commentLimit);
};

interface SearchResult {
  id: number;
  boardTitle: string;
  boardContent: string;
  userName: string;
  commentContent: string;
  category: string;
};


const getBoards = async (keyword: string) => {
  let searchResult: SearchResult[] = [];
  searchResult = await boardModels.getBoards(keyword);
  console.log(searchResult)
  if (keyword.length === 0) {
    const error = new Error('검색어가 없습니다.');
    // error.statusCode = 402;
    return error;
  }
  if (searchResult.length === 0) {
    const error = new Error('검색 결과가 없습니다.');
    // error.statusCode = 403;
    return error;
  }
  return searchResult;
};

const increaseView = async (boardId: string, userId: string) => {
  const existingUser = await boardModels.getUserById(boardId, userId);
  if (existingUser.length > 0) {
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