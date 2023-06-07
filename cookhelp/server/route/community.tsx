const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../lib/db.tsx');
const sessionOption = require('../lib/sessionOption.tsx');

// router
const router = express.Router();
module.exports = router;

router.use(bodyParser.json({
    limit : "50mb"
}))
router.use(bodyParser.urlencoded({extended:true}))
// router.use(express.json({
//     limit : "50mb"
// }));
router.use(bodyParser.urlencoded({
    limit:"50mb",
    extended: false
}));
router.use(cors());

router.get('/', (req, res) => {
    res.send('Hello, community');
});

  
// 게시글 리스트 불러오기
router.get("/api/list", (req, res) => {
    const sqlQuery = "SELECT board_idx, title, members, DATE_FORMAT(create_date, '%Y-%m-%d') AS create_date, boardstyle FROM board ORDER BY board_idx desc;";
    db.query(sqlQuery, (err, result) => {
        res.send(result)
    });
});

// 게시글 업로드 처리
router.post('/api/upload', function (req, res) {

    const title = req.body.title;
    // const members = req.body.members;
    const members = req.body.members;
    const content = req.body.content;
    const boardstyle = req.body.boardstyle;

    const query = `INSERT INTO board (title, members, content, boardstyle) VALUES (?,?,?,?);`;
    const values = [
        title, members, content, boardstyle
    ];
    const sendData = { isSuccess: "" };

    db.query(query, values, function (error, result, fields) {
        if (error) {
            console.error("데이터 삽입 오류", error)
            sendData.isSuccess = "데이터 삽입 오류 발생";
        } else {
            sendData.isSuccess = "True";
            console.log("게시판 업로드 완료.");
        }
    })

    // 업로드 완료 시 동작할 코드 작성
    res.send('게시판 업로드 완료.');
});

// 요리 도우미 구현
router.get("/api/board/:board_idx", (req, res) => {

    // const recipe_idx = 1;
    const board_idx = req.params.board_idx;

    const sqlQuery = `SELECT *, DATE_FORMAT(create_date, '%Y-%m-%d') AS create_date FROM board WHERE board_idx = '${board_idx}';`;
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log("데이터 조회 오류", err);
            res.result(500).send("데이터 조회 오류");
            return;
        }

        console.log("데이터 전송 성공, 데이터 개수:", result.length)
        res.send(result);
        // console.log('게시판 목록 생성 완료. 전송 개수: ', recipeResult.length, recipeResult[0]);
    });
});



// 리스트 검색
router.get("/api/search/:keyword", (req, res) => {

    const keyword = req.params.keyword;

    const sqlQuery = `SELECT board_idx, title, members, DATE_FORMAT(create_date, '%Y-%m-%d') AS create_date, boardstyle FROM board WHERE title LIKE '%${keyword}%';`;
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log("데이터 조회 오류", err);
            res.result(500).send("데이터 조회 오류");
            return;
        }

        console.log("데이터 전송 성공, 데이터 개수:", result.length)
        res.send(result);
        // console.log('게시판 목록 생성 완료. 전송 개수: ', recipeResult.length, recipeResult[0]);
    });
});

// 아래부터 테스트 함수들.
// ===================================================================================================================================================================================================
// 데이터 삽입 테스트, 현재 상황 : 여러개 이미지를 받아 지정경로에 저장.
router.post('/api/uploadTestTable', function (req, res, next) {

    const title = req.body.recipe_title;
    const stuff = req.body.recipe_stuff;
    // const img = req.files.map(file => `./img_server/${file.filename}`);
    const img = req.files.map(files => `./img_server/${files.filename}`);

    const query = `INSERT INTO testtable (title, stuff, img_path) VALUES (?, ?, ?);`
    const value = [title, stuff, ...img];

    const sendData = { isSuccess: "" };

    db.query(query, value, function (error, result, fields) {
        if (error) {
            console.error("데이터 삽입 오류", error)
            sendData.isSuccess = "데이터 삽입 오류 발생"
        } else {
            sendData.isSuccess = "True";
            console.log("레시피 데이터 저장 완료.");
        }
    })

    // 업로드 완료 시 동작할 코드 작성
    res.send('파일 업로드 완료.');
});

// ===================================================================================================================================================================================================