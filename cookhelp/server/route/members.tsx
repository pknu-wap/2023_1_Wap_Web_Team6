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

const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(sessionOption);
// 세션 스토어 저장 부분
const sessionMiddleware = session({
  key: 'session_cookie_name',
  secret: 'hello',
  store: sessionStore,    // 세션 스토어는 mysql 에 sessions 저장 부분
  resave: true,
  saveUninitialized: true
});

router.use(sessionMiddleware);
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
router.use(cors({
  origin: ["http://localhost:3000"],
  method: ["POST","GET"],
  credentials:true
}))
router.get('/', (req, res) => {
  console.log(req.session);
  console.log(req.sessionID)
  if (req.session.num === undefined) {
    req.session.num = 1;
  } else {
    req.session.num++;
  }
  req.session.save();
  console.log(req.session)
  res.send(`Hello Dormamu we meet ${req.session.num} times`);
});
  
// router.get("/logout",function(req,res){
//   req.session.destroy();
//   console.log("logout success");       
// });
// ======================================================================================================
// 로그아웃 
// router.get('/api/logout', function (req, res) {
//   req.session.destroy(function (err) {
//       res.redirect('/');
//   });
// });
// ======================================================================================================
// 회원 체크(세션에 넣어주기(navBar에서 이용)) 
router.get('/api/authcheck', (req, res) => {      
  const sendData = { isLogin: "" };
  console.log(req.sessionID)
  console.log(req.session)
  if (req.session.is_logined && req.loginSessionId === req.sessionID) {
      sendData.isLogin = "True"
  } else {
      sendData.isLogin = "False"
  }
  res.send(sendData);
})

// ======================================================================================================
// 로그인 
router.post("/api/login", (req, res) => {
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
            const loginSessionId = req.sessionID;

            req.session.save(function (err) {
              if (err) {
                console.error('세션 저장 오류:', err);
                sendData.isLogin = "세션 저장 오류가 발생했습니다.";
                res.send(sendData);
              } else {
                req.loginSessionId = loginSessionId;
                sendData.isLogin = "True";
                console.log(req.sessionID);
                console.log(req.session);
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

// ======================================================================================================
// 회원가입
router.post("/api/Join", (req, res) => {  // 데이터 받아서 결과 전송
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
                    req.session.is_logined = true;
                    req.session.nickname = userId;
                    req.session.save(function () {    
                        sendData.isSuccess = "True"
                        res.send(sendData);
                    });
                    // db.query(`INSERT INTO logTable (created, username, action, command, actiondetail) VALUES (NOW(), ?, 'login' , ?, ?)`
                    //         , [req.session.nickname, '-', `React 로그인 테스트`], function (error, result) { });
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

// ======================================================================================================
// 회원 정보 가져오기
router.get('/api/info', (req, res) => {      
  const userId = req.body.loginId;

  const sendData = { isSuccess: "" };
})
// ======================================================================================================
// 회원 정보 수정하기
router.get('/api/modify', (req, res) => {      
  const userId = req.body.modifyId;
  const userPassword = req.body.modifyPassword;
  const userName = req.body.modifyName;
  const userSelectFood = req.body.modifySelectFood;

  const sendData = { isSuccess: "" };

  if (userId && userPassword && userName && userSelectFood) {
      db.query('UPDATE members SET PASSWORD ="?", nickname="?", foodstyle="?" WHERE id ="?"', [userPassword, userName, userSelectFood, userId], function (error, data) {
          if (error) throw error;                    
            console.log('회원정보 수정 완료!')
            req.session.is_logined = true;
            req.session.nickname = userId;
            req.session.save(function () {    
              sendData.isSuccess = "True"
              res.send(sendData);
            });
        });
  } else {
    console.log('아이디 비밀번호 입력하세요!')
    sendData.isSuccess = "아이디와 비밀번호를 입력하세요!"
    res.send(sendData);  
  }      
});        