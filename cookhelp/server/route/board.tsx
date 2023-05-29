// import 부분
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../lib/db.tsx');
const sessionOption = require('../lib/sessionOption.tsx');

// rouer 부분
const router = express.Router();
module.exports = router;

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
router.use(cors())

var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(sessionOption);
router.use(session({  
	key: 'session_cookie_name',
    secret: '~',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}))

router.get('/', (req, res) => {
    res.send('Hello, board');
  });

  
// 레시피 리스트 불러오기
router.get("/api/list", (req, res) => {
    const sqlQuery = "SELECT recipe_idx, recipe_title, members, created_date, foodstyle from cookhelper;";
    db.query(sqlQuery, (err, result) => {
        res.send(result)
        console.log('게시판 목록 생성 완료.')
    });
});

// multer
const multer = require('multer');

// Multer 디렉토리 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // 파일 저장 경로 설정
      cb(null, 'img_server/');
    },
    filename: function (req, file, cb) {
      // 저장될 파일명 설정
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// 파일 업로드 처리
router.post('/api/upload', upload.single('recipe_img'), function (req, res, next) {

    const recipe_title = req.body.recipe_title;
    const members = req.body.members;
    const recipe_stuff = req.body.recipe_stuff;
    const recipe_img = req.body.recipe_img;
    const timer = req.body.timer;
    const foodstyle = req.body.foodstyle;

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
    const rd_1_img = req.body.rd_1_img;
    const rd_1_video = req.body.rd_1_video;
    const rd_2 = req.body.rd_2;
    const rd_2_img = req.body.rd_2_img;
    const rd_2_video = req.body.rd_2_video;
    const rd_3 = req.body.rd_3;
    const rd_3_img = req.body.rd_3_img;
    const rd_3_video = req.body.rd_3_video;
    const rd_4 = req.body.rd_4;
    const rd_4_img = req.body.rd_4_img;
    const rd_4_video = req.body.rd_4_video;
    const rd_5 = req.body.rd_5;
    const rd_5_img = req.body.rd_5_img;
    const rd_5_video = req.body.rd_5_video;
    const rd_6 = req.body.rd_6;
    const rd_6_img = req.body.rd_6_img;
    const rd_6_video = req.body.rd_6_video;
    const rd_7 = req.body.rd_7;
    const rd_7_img = req.body.rd_7_img;
    const rd_7_video = req.body.rd_7_video;
    const rd_8 = req.body.rd_8;
    const rd_8_img = req.body.rd_8_img;
    const rd_8_video = req.body.rd_8_video;
    const rd_9 = req.body.rd_9;
    const rd_9_img = req.body.rd_9_img;
    const rd_9_video = req.body.rd_9_video;
    const rd_10 = req.body.rd_10;
    const rd_10_img = req.body.rd_10_img;
    const rd_10_video = req.body.rd_10_video;
    
  //   // 반복되는 데이터를 배열로 정리
  //   const recipe_steps: string[] = [];
  //   const recipe_descriptions: string[] = [];
  //   const rd_img: string[] = [];
  //   const rd_video: string[] = [];

  // for (let i = 1; i <= 10; i++) {
  //   recipe_steps.push(req.body[`recipe_step_${i}`]);
  //   recipe_descriptions.push(req.body[`recipe_description_${i}`]);
  //   rd_img.push(req.body[`recipe_description_${i}`]);
  //   rd_video.push(req.body[`recipe_description_${i}`]);
  // }

  const sendData = { isSuccess: "" };

  const query = `INSERT INTO cookhelper (recipe_title, members, recipe_stuff, recipe_img, recipe_step_1, recipe_step_2, recipe_step_3, recipe_step_4, recipe_step_5, recipe_step_6, recipe_step_7, recipe_step_8, recipe_step_9, recipe_step_10, rd_1, rd_1_img, rd_1_video, rd_2, rd_2_img, rd_2_video, rd_3, rd_3_img, rd_3_video, rd_4, rd_4_img, rd_4_video, rd_5, rd_5_img, rd_5_video, rd_6, rd_6_img, rd_6_video, rd_7, rd_7_img, rd_7_video, rd_8, rd_8_img, rd_8_video, rd_9, rd_9_img, rd_9_video, rd_10, rd_10_img, rd_10_video, timer, created_date, foodstyle) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  
  const values = [
    recipe_title, members, recipe_stuff, recipe_img, recipe_step_1, recipe_step_2, recipe_step_3, recipe_step_4, recipe_step_5, recipe_step_6, recipe_step_7, recipe_step_8, recipe_step_9, recipe_step_10,
    rd_1, rd_1_img, rd_1_video, rd_2, rd_2_img, rd_2_video, rd_3, rd_3_img, rd_3_video, rd_4, rd_4_img, rd_4_video, rd_5, rd_5_img, rd_5_video, rd_6, rd_6_img, rd_6_video, rd_7, rd_7_img, rd_7_video, rd_8, rd_8_img, rd_8_video,
    rd_9, rd_9_img, rd_9_video, rd_10, rd_10_img, rd_10_video, timer, foodstyle
  ];
    
    db.query(query, values, function (error, result, fields) {
        if (error) {
            console.error("데이터 삽입 오류", error)
            sendData.isSuccess = "데이터 삽입 오류 발생"
        } else {
            sendData.isSuccess = "True";
        }
    })

    console.log("레시피 데이터 저장 완료");
    // 업로드 완료 시 동작할 코드 작성
    res.send('파일 업로드 완료.');
});
