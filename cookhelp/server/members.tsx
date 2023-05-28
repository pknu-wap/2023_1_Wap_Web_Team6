const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const fs = require('fs');
const bcrypt = require('bcrypt');
//express 서버
// port 설정 부분
const port = process.env.PORT || 8081;

const db = require('./lib/db.tsx');
const sessionOption = require('./lib/sessionOption.tsx');

// 사용자들 테스트 하는 부분
//json형식으로 주고 받음
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(sessionOption);
app.use(session({  
	key: 'session_cookie_name',
    secret: '~',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}))

app.get('/authcheck', (req, res) => {   
  const sendData = { isLogin: "" };
  if (req.session.is_logined) {
      sendData.isLogin = "True"
  } else {
      sendData.isLogin = "False"
  }
  res.send(sendData);
})

app.get('/api/logout', function (req, res) {
  req.session.destroy(function (err) {
      res.redirect('/');
  });
});


app.post("/api/login", (req, res) => {
    const userId = req.body.loginId;
    const password = req.body.loginPassword;
    const sendData = { isLogin: "" };
  
    if (userId && password) {
      db.query('SELECT * FROM members WHERE id = ?', [userId], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          if (results[0].password == password) {
            req.session.is_logined = true;
            req.session.nickname = userId;
            req.session.save(function (err) {
              if (err) {
                console.error('세션 저장 오류:', err);
                sendData.isLogin = "세션 저장 오류가 발생했습니다.";
                res.send(sendData);
              } else {
                sendData.isLogin = "True";
                console.log(sendData);
                res.send(sendData);
              }
            });
          } else {
            sendData.isLogin = "로그인 정보가 일치하지 않습니다.";
            console.log('비밀번호가 틀렸습니다.');
            res.send(sendData);
          }
        } else {
          sendData.isLogin = "아이디 정보가 일치하지 않습니다.";
          console.log('아이디가 없습니다.');
          res.send(sendData);
        }
      });
    } else {
      sendData.isLogin = "아이디와 비밀번호를 입력하세요!";
      res.send(sendData);
    }
});


app.post("/api/Join", (req, res) => {  // 데이터 받아서 결과 전송
    const userId = req.body.joinId;
    const userPassword = req.body.joinPassword;
    const userName = req.body.joinName;
    const userSelectFood = req.body.joinSelectFood;
    
    const sendData = { isSuccess: "" };

    if (userId && userPassword && userName && userSelectFood) {
        db.query('SELECT * FROM members WHERE id = ?', [userId], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
            if (error) throw error;
            if (results.length <= 0) {         // DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우
                db.query('INSERT INTO members (id, password, nickname, foodstyle) VALUES(?,?,?,?)', [userId, userPassword, userName, userSelectFood], function (error, data) {
                    if (error) throw error;                    
                    console.log('회원가입 성공!')
                    // req.session.save(function () {    
                    //     sendData.isSuccess = "True"
                    //     res.send(sendData);
                    // });
                });
            }
            else {                                                  // DB에 같은 이름의 회원아이디가 있는 경우            
                sendData.isSuccess = "이미 존재하는 아이디 입니다!"
                console.log('이미 아이디가 있습니다')
                res.send(sendData);  
            }            
        });        
    } else {
        console.log('아이디 비밀번호 입력하세요!')
        sendData.isSuccess = "아이디와 비밀번호를 입력하세요!"
        res.send(sendData);  
    }
  
});

// 레시피 리스트 불러오기
app.get("/api/list", (req, res) => {
    const sqlQuery = "SELECT recipe_idx, recipe_title, members, created_date, foodstyle from cookhelper;";
    db.query(sqlQuery, (err, result) => {
        res.send(result)
        console.log('게시판 목록 생성 완료.')
    });
});

// // multer
// const multer = require('multer');

// // Multer 디렉토리 설정
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       // 파일 저장 경로 설정
//       cb(null, 'img_server/');
//     },
//     filename: function (req, file, cb) {
//       // 저장될 파일명 설정
//       cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// // 파일 업로드 처리
// app.post('/upload', upload.single('recipe_img'), function (req, res, next) {

//     const recipe_title = req.body.recipe_title;
//     const members = req.body.members;
//     const recipe_stuff = req.body.recipe_stuff;
//     const recipe_img = req.body.recipe_img;
//     const timer = req.body.timer;
//     const foodstyle = req.body.foodstyle;
    
//     // 반복되는 데이터를 배열로 정리
//     const recipe_steps: string[] = [];
//     const recipe_descriptions: string[] = [];
//     const rd_img: string[] = [];
//     const rd_video: string[] = [];

//   for (let i = 1; i <= 10; i++) {
//     recipe_steps.push(req.body[`recipe_step_${i}`]);
//     recipe_descriptions.push(req.body[`recipe_description_${i}`]);
//     rd_img.push(req.body[`recipe_description_${i}`]);
//     rd_video.push(req.body[`recipe_description_${i}`]);
//   }

//   const sendData = { isSuccess: "" };

//   const query = `INSERT INTO cookhelper (recipe_title, members, recipe_stuff, recipe_img, recipe_step_1, recipe_step_2, recipe_step_3, recipe_step_4, recipe_step_5, recipe_step_6, recipe_step_7, recipe_step_8, recipe_step_9, recipe_step_10, rd_1, rd_1_img, rd_1_video, rd_2, rd_2_img, rd_2_video, rd_3, rd_3_img, rd_3_video, rd_4, rd_4_img, rd_4_video, rd_5, rd_5_img, rd_5_video, rd_6, rd_6_img, rd_6_video, rd_7, rd_7_img, rd_7_video, rd_8, rd_8_img, rd_8_video, rd_9, rd_9_img, rd_9_video, rd_10, rd_10_img, rd_10_video, timer, created_date, foodstyle) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  
//   const values = [
//     recipe_title, members, recipe_stuff, recipe_img, ...recipe_steps, ...recipe_descriptions, ...rd_img, ...rd_video, timer, foodstyle
//   ];
    
//     db.query(query, values, function (error, result, fields) {
//         if (error) {
//             console.error("데이터 삽입 오류", error)
//             sendData.isSuccess = "데이터 삽입 오류 발생"
//         } else {
//             sendData.isSuccess = "True";
//         }
//     })

//     console.log(recipe_title);
//     // 업로드 완료 시 동작할 코드 작성
//     res.send('파일 업로드 완료.');
// });

// 서버 작동하는지 찍는 부분
app.listen(port, () => console.log('Listening on port',port))