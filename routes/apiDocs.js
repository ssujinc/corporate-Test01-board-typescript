// API 명세서
/**
 * @swagger
 * paths:
 *  /boards:
 *    get:
 *      summary: 게시판 검색 조회
 *      tags:
 *      - board
 *      description: keyword에 검색 단어를 입력하여 조회 할 수 있다.
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: keyword
 *          required: false
 *          type: string
 *          description: 게시판
 *      responses:
 *       200:
 *        description: data
 *
 *  /board/{id}:
 *    get:
 *      summary: 게시판 조회
 *      tags:
 *      - board
 *      description: 게시판 board의 id를 이용하여 게시판 한개를 조회하며, page query 로 댓글의 pagination을 볼 수 있다.
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: integer
 *          description : "boardId"
 *
 *        - in: query
 *          name: offset
 *          required: true
 *          type: integer
 *          description : "댓글 pagination page number"
 *
 *        - in: query
 *          name: limit
 *          required: true
 *          type: integer
 *          description : "댓글 pagination page number"
 *      responses:
 *       200:
 *        description: data
 *
 *    put:
 *      summary: 게시판 조회수 조회
 *      tags:
 *      - board
 *      description: user의 id가 다르면 조회수가 증가하며, 같은 user의 id가 들어가면 조회수의 증가가 일어나지 않는다.
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: integer
 *          description : "boardId"
 *
 *        - in: body
 *          name: userId
 *          required: true
 *          type: integer
 *          properties:
 *              userId:
 *                  type: integer
 *                  example: 1
 *      responses:
 *       200:
 *        description: 조회수
 *
 *  /comment:
 *    post:
 *      summary: 댓글 등록
 *      tags:
 *      - comment
 *      description: board의 id로 이용하여 게시판을 지정해주고, 댓글 또는 대댓글 등 무한 댓글을 등록 할 수 있다.
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: createCommentDto
 *          required: ture
 *          schema:
 *              $ref: "#/definitions/comment"
 *      responses:
 *       200:
 *        description: 검색 결과
 *
 * definitions:
 *  comment:
 *      type : object
 *      required:
 *          userId
 *      properties:
 *          boardId:
 *              type: integer
 *              description: board Id 가져오기
 *              example: 1
 *          userId:
 *              type: integer
 *              description: user Id 가져오기
 *              example: 1
 *          comment:
 *              type: string
 *              description: 코멘트 내용 입력
 *              example: "안녕"
 *          parentId:
 *               type: integer
 *               description: 대댓글일때만 작성하고, 첫번째 댓글일 경우에는 삭제
 *               example: 1
 */
