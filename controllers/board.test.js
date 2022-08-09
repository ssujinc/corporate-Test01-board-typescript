import * as board from './board.js';
import * as boardService from '../services/board.js';

describe('board.js test', () => {
  test('readBoard test', async () => {
    const req = {
      keyword: '백엔드',
    };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    let keyword = '백엔드';
    await boardService.readBoard(keyword);
    // expect(board.readBoard('백엔드')).toBe(1);
    expect(res.send.length).toBe(6);
  });
  //   test('readBoard test', () => {
  //     expect(board.createComment(1)).toBe(1);
  //   });
  //   test('readBoard test', () => {
  //     expect(board.updateView(1)).toBe(1);
  //   });
});

// describe('board.js test', () => {
//   test('readBoard test', async () => {
//     let keyword = '백엔드';
//     await boardService.readBoard(keyword);

//     expect(res.send.length).toBe();
//     expect(board.readBoard('백엔드')).toBe(1);
//   });
//   test('readBoard test', () => {
//     expect(board.createComment(1)).toBe(1);
//   });
//   test('readBoard test', () => {
//     expect(board.updateView(1)).toBe(1);
//   });
// });

// describe("Check method 'todoController' ", () => {
//   test('should 200 and return correct value', async () => {
//     let req = mockRequest();
//     req.params.id = 1;
//     const res = mockResponse();

//     await controller.todoController(req, res);

//     expect(res.send).toHaveBeenCalledTimes(1);
//     expect(res.send.mock.calls.length).toBe(1);
//     expect(res.send).toHaveBeenCalledWith('Hello i am todo controller');
//   });

//   test('should 404 and return correct value', async () => {
//     let req = mockRequest();
//     req.params.id = null;
//     const res = mockResponse();

//     await controller.todoController(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
//   });
// });
