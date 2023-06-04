const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('../lib/db.tsx');
const sessionOption = require('../lib/sessionOption.tsx');


const multer = require('multer');

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
    res.send('Hello Cookhelper');
});

// 요리 도우미 구현
// router.get("/api/recipehelper/:recipe_idx", (req, res) => {

//     // const recipe_idx = 1;
//     const recipe_idx = req.params.recipe_idx;

//     const sqlQuery = `SELECT *, DATE_FORMAT(created_date, '%Y-%m-%d') AS formatted_date FROM cookhelper WHERE recipe_idx = '${recipe_idx}';`;
//     db.query(sqlQuery, (err, result) => {
//         if (err) {
//             console.log("데이터 조회 오류", err);
//             res.result(500).send("데이터 조회 오류");
//             return;
//         }

//         console.log("데이터 전송 성공, 데이터 개수:", result.length)
//         res.send(result);
//         // console.log('게시판 목록 생성 완료. 전송 개수: ', recipeResult.length, recipeResult[0]);
//     });
// });