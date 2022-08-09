# BoradAPI

<br>

## 사용 기술스택

### Javascript

### Express

### MySql

### Prisma

<br>

## 실행방법

### 1.해당 레포지토리를 clone합니다.

```shell
git clone https://github.com/ssujinc/corporate-Test01-board.git
```


### 2. 다운 받으신 폴더로 들어갑니다

```shell
cd corporate-Test01-board
```


### 3. 의존성들을 설치합니다.

```shell
npm i
```

### 4. Swagger 문서를 build합니다

```shell
npm run api-docs
```

### 5. 실행시킵니다!

```shell
nodemon server.js
```

<br>


# API 명세서 
```shell
http://localhost:10010/api-docs
```
![image](https://user-images.githubusercontent.com/103615884/183561575-0f42f2ff-5826-491c-ab26-74d47383c70e.png)

- 해당 프로젝트는 아래내용을 기반으로 만들었습니다.
    - 게시글 카테고리가 있습니다.
    - 게시글 검색 기능이 있습니다.
    - 게시글에서 특정 키워드를 검색하면, 게시글 제목, 게시글 본문, 게시글 댓글, 게시글 작성자 이름 에서 모두 검색하여, 해당 게시물을 표출합니다.
      ex) 노드 를 검색
    - 대댓글(1 depth)
      댓글에는 대댓글을 달 수 있습니다.
      1 depth는 필수이지만, 2, 3중으로 대댓글을 계속해서 추가할 수 있다면 가산점이 있습니다.
      댓글/대댓글 pagination
    - 게시글 읽힘 수
      같은 User가 게시글을 읽는 경우 count 수 증가하면 안 됩니다.
    - Restful API 규칙에 따라 설계합니다.
    - Unit Test 를 추가합니다.
    - 1000만건 이상의 데이터를 넣고 성능테스트 진행 결과 필요합니다.
<br>

- 게시글 카테고리의 종류는 JUSTCODE, 자유게시판, 프론트엔드, 백엔드, stackoverflow, articles, 채용공고가 있습니다.

<br> 

- 게시글 검색
  - GET /boards API를 를 사용하여 검색 하실수 있습니다. keyword는 자유자재로 작성 가능합니다. 게시글 제목, 게시글 본문, 게시글 댓글, 게시글 작성자 이름에서 모두 검색 가능하며, 표출됩니다.
  
  ![image](https://user-images.githubusercontent.com/103615884/183561639-9b8b3ca6-453a-4839-8467-571394f8b030.png)

  
  필터를 작성하기 위해 새로운 함수를 만들어서, 스크립트로 sql문을 만들었습니다. 코드는 이렇습니다.
  ```javascript
  export const searchFilter = (keyword) => {
    const searchColumn = ['board.title', 'board.contents', 'user.nickname', 'c.commentContent'];
    const conditions = searchColumn.map((column) => `${column} LIKE '%${keyword}%'`);
    return `(${conditions.join(' OR ')})`;
  };
  ```
  이 함수를 models 에서 호출하여 상황에 맞게 검색 할수 있도록 하였습니다.
  
<br>

- 댓글/대댓글 무한댓글 등록
  - POST /coment/:id 로 확인하실수 있습니다.  
  - comment DATABASE에 depth와 parent_id column 을 추가하여, 무한 댓글이 가능합니다. 
    - body값에 parent_id가 있다면, comment table 의 id와 같은 값을 parent_id 에 넣어주면서, depth 에는 +1 값을 해줍니다. 
    
  ![image](https://user-images.githubusercontent.com/103615884/183561726-3f5e7f57-1878-4b90-ab5e-63858a9d2438.png)

  
  parentId 값이 없을 경우에는 삼항연산자를 사용하여 값을 제한해주었습니다. 
  
  구현 코드는 아래와 같습니다.
  ```javascript
    let depth;
    if (parentId !== undefined) {
      let pdepth = await prisma.$queryRaw`SELECT depth FROM comment WHERE id=${parentId}`;
      depth = Number(pdepth[0].depth) + 1;
    } else {
      depth = 0;
    }
    ...
     ${parentId ? `, depth, parent_id` : ``}
  ```
  
<br>

- 댓글 pagination
  - 기본 댓글은 0 depth, 대댓글은 1의 depth를 가지고있습니다. 대댓글의 페이지네이션은 GET /board/2?page 에서 확인하실수 있으며, 게시판 조회할때, 댓글 페이지네이션을 지정하여 확인가능합니다.

  ![image](https://user-images.githubusercontent.com/103615884/183029470-b06b595c-8b86-460b-af09-8736168ec793.png)

  Client가 처음엔 페이지네이션 된 버튼을 누르는게 아닌 단순히 게시판을 눌렀을때, 바로 첫번째 페이지네이션으로 이동하게 합니다.

  구현 코드는 아래와 같습니다.
  ```javascript
    const start = (pageNum - 1) * 5;
    ...
    ${start ? `LIMIT ${start}, 5` : `LIMIT 0,5`}
  ```
  
<br>

- 게시판 조회수 
  - 조회수가 증가하지만, user가 중복되면 조회수는 증가되지 않아야 하기 때문에, view 라는 DATABASE를 만들고, 거기에 user가 있는지 없는지를 확인합니다. 확인후에, 있으면 조회수가 증가되지 않고, 없으면 view 테이블의 row를 insert 해주었습니다.
  -그 row 개수의 합계로 조회수 조회가 가능하도록 하였습니다.
  
  ![image](https://user-images.githubusercontent.com/103615884/183032702-2f3fb1cb-572d-4174-91b6-1d83e8277caf.png)

  구현 코드는 아래와 같습니다.
   ```javascript
    const [existingUser] = await prisma.$queryRaw`
      SELECT * FROM view
      WHERE board_id=${boardId} AND user_id=${userId}
    `;
    ...
    SELECT COUNT(*) AS cnt FROM view WHERE board_id=${boardId}
   ```
<br><br><br>
- Rest API 설계
  - Rest API를 이용하여 설계하였습니다.
- Unit Test
  - Unit Test는 진행하지 못했습니다.
- 1000만건 이상의 데이터를 넣고 성능테스트는 진행하지 못했습니다.
