const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../lib/db.tsx');
const sessionOption = require('../lib/sessionOption.tsx');

// multer
const multer = require('multer');

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

function fileFilter (req, file, cb) {

    // 이 함수는 boolean 값과 함께 `cb`를 호출함으로써 해당 파일을 업로드 할지 여부를 나타낼 수 있습니다.
    // 이 파일을 거부하려면 다음과 같이 `false` 를 전달합니다:
    cb(null, false)
  
    // 이 파일을 허용하려면 다음과 같이 `true` 를 전달합니다:
    cb(null, true)
  
    // 무언가 문제가 생겼다면 언제나 에러를 전달할 수 있습니다:
    cb(new Error('I don\'t have a clue!'))
  
}

// Multer 디렉토리 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // 파일 저장 경로 설정
      cb(null, './img_server');
    },
    filename: function (req, file, cb) {
      // 저장될 파일명 설정("YYYYMMDDTTMM")
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      const hour = currentDate.getHours().toString().padStart(2, '0');
      const minute = currentDate.getMinutes().toString().padStart(2, '0');
      
      const formattedDate = `${year}${month}${day}${hour}${minute}`;
      
      cb(null, formattedDate + '-' + file.originalname);
    }
});


const upload = multer({ storage: storage }); // 파일이 저정될 경로 설정

router.get('/', (req, res) => {
    res.send('Hello, community');
});

  
// 레시피 리스트 불러오기
router.get("/api/list", (req, res) => {
    const sqlQuery = "SELECT board_idx, title, members, DATE_FORMAT(create_date, '%Y-%m-%d') AS create_date, boardstyle FROM board;";
    db.query(sqlQuery, (err, result) => {
        res.send(result)
        console.log('게시판 목록 생성 완료.')
    });
});

/*
// 파일 업로드 처리
router.post('/api/upload', upload.array('recipe_img'), function (req, res, next) {

    const recipe_title = req.body.recipe_title;
    // const members = req.body.members;
    const members = "관리자";
    const recipe_stuff = req.body.recipe_stuff;
    const recipe_img = req.files.map(file => `./img_server/${file.filename}`);

    console.log(recipe_img);

    const recipe_step_1 = req.body.recipe_step_1;
    const recipe_step_2 = req.body.recipe_step_2;
    const recipe_step_3 = req.body.recipe_step_3;
    const recipe_step_4 = req.body.recipe_step_4;
    const recipe_step_5 = req.body.recipe_step_5;
    const recipe_step_6 = req.body.recipe_step_6;
    const recipe_step_7 = req.body.recipe_step_7;
    const recipe_step_8 = req.body.recipe_step_8;
    const recipe_step_9 = req.body.recipe_step_9;
    const recipe_step_10 = req.body.recipe_step_10;

    const rd_1 = req.body.rd_1;
    const rd_1_video = req.body.rd_1_video;
    const timer_rd_1 = req.body.timer_rd_1;
    const rd_2 = req.body.rd_2;
    const rd_2_video = req.body.rd_2_video;
    const timer_rd_2 = req.body.timer_rd_2;
    const rd_3 = req.body.rd_3;
    const rd_3_video = req.body.rd_3_video;
    const timer_rd_3 = req.body.timer_rd_3;
    const rd_4 = req.body.rd_4;
    const rd_4_video = req.body.rd_4_video;
    const timer_rd_4 = req.body.timer_rd_4;
    const rd_5 = req.body.rd_5;
    const rd_5_video = req.body.rd_5_video;
    const timer_rd_5 = req.body.timer_rd_5;
    const rd_6 = req.body.rd_6;
    const rd_6_video = req.body.rd_6_video;
    const timer_rd_6 = req.body.timer_rd_6;
    const rd_7 = req.body.rd_7;
    const rd_7_video = req.body.rd_7_video;
    const timer_rd_7 = req.body.timer_rd_7;
    const rd_8 = req.body.rd_8;
    const rd_8_video = req.body.rd_8_video;
    const timer_rd_8 = req.body.timer_rd_8;
    const rd_9 = req.body.rd_9;
    const rd_9_video = req.body.rd_9_video;
    const timer_rd_9 = req.body.timer_rd_9;
    const rd_10 = req.body.rd_10;
    const rd_10_video = req.body.rd_10_video;
    const timer_rd_10 = req.body.timer_rd_10;

    const created_date = Date.now();
    const foodstyle = req.body.foodstyle;

    const recipe_img_1 = recipe_img[1] || null;
    const recipe_img_2 = recipe_img[2] || null;
    const recipe_img_3 = recipe_img[3] || null;
    const recipe_img_4 = recipe_img[4] || null;
    const recipe_img_5 = recipe_img[5] || null;
    const recipe_img_6 = recipe_img[6] || null;
    const recipe_img_7 = recipe_img[7] || null;
    const recipe_img_8 = recipe_img[8] || null;
    const recipe_img_9 = recipe_img[9] || null;
    const recipe_img_10 = recipe_img[10] || null;

    // 반복 처리 (미완성)
    // const recipe_steps: string[] = [];
    // const recipe_descriptions: string[] = [];
    // const rd_img: string[] = [];
    // const rd_video: string[] = [];

    // for (let i = 1; i <= 10; i++) {
    //     recipe_steps.push(req.body[`recipe_step_${i}`]);
    //     recipe_descriptions.push(req.body[`recipe_description_${i}`]);
    //     rd_img.push(req.body[`rd_${i}_img`]);
    //     rd_video.push(req.body[`rd_${i}_video`]);
    // }

    
    const query = `INSERT INTO cookhelper (recipe_title, members, recipe_stuff, recipe_img, recipe_step_1, recipe_step_2, recipe_step_3, recipe_step_4, recipe_step_5, recipe_step_6, recipe_step_7, recipe_step_8, recipe_step_9, recipe_step_10, rd_1, rd_1_video, timer_rd_1, rd_2, rd_2_video, timer_rd_2, rd_3, rd_3_video, timer_rd_3, rd_4, rd_4_video, timer_rd_4, rd_5, rd_5_video, timer_rd_5, rd_6, rd_6_video, timer_rd_6, rd_7, rd_7_video, timer_rd_7, rd_8, rd_8_video, timer_rd_8, rd_9, rd_9_video, timer_rd_9, rd_10, rd_10_video, timer_rd_10, created_date, foodstyle, recipe_img_1, recipe_img_2, recipe_img_3, recipe_img_4, recipe_img_5, recipe_img_6, recipe_img_7, recipe_img_8, recipe_img_9, recipe_img_10) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
    const values = [
        recipe_title, members, recipe_stuff, ...recipe_img, recipe_step_1, recipe_step_2, recipe_step_3, recipe_step_4, recipe_step_5, recipe_step_6, recipe_step_7, recipe_step_8, recipe_step_9, recipe_step_10,
        rd_1, rd_1_video, timer_rd_1, rd_2, rd_2_video, timer_rd_2, rd_3, rd_3_video, timer_rd_3, rd_4, rd_4_video, timer_rd_4, rd_5, rd_5_video, timer_rd_5,
        rd_6, rd_6_video, timer_rd_6, rd_7, rd_7_video, timer_rd_7, rd_8, rd_8_video, timer_rd_8, rd_9, rd_9_video, timer_rd_9, rd_10, rd_10_video, timer_rd_10,
        created_date, foodstyle, recipe_img_1, recipe_img_2, recipe_img_3, recipe_img_4, recipe_img_5, recipe_img_6,
        recipe_img_7, recipe_img_8, recipe_img_9, recipe_img_10
    ];
    
    const sendData = { isSuccess: "" };

    db.query(query, values, function (error, result, fields) {
        if (error) {
            console.error("데이터 삽입 오류", error)
            sendData.isSuccess = "데이터 삽입 오류 발생";
        } else {
            sendData.isSuccess = "True";
            console.log("파일 업로드 완료.");
        }
    })

    // 업로드 완료 시 동작할 코드 작성
    res.send('파일 업로드 완료.');
});

// 요리 도우미 구현
router.get("/api/recipehelper/:recipe_idx", (req, res) => {

    // const recipe_idx = 1;
    const recipe_idx = req.params.recipe_idx;

    const sqlQuery = `SELECT *, DATE_FORMAT(created_date, '%Y-%m-%d') AS formatted_date FROM cookhelper WHERE recipe_idx = '${recipe_idx}';`;
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
*/


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
router.post('/api/uploadTestTable', upload.array('recipe_img'), function (req, res, next) {

    const title = req.body.recipe_title;
    const stuff = req.body.recipe_stuff;
    // const img = req.files.map(file => `./img_server/${file.filename}`);
    const img = req.files.map(files => `./img_server/${files.filename}`);

    console.log(img);

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