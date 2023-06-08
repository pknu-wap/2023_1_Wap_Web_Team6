require('dotenv').config();
var options = {  
  "host": process.env.host,
  "user": process.env.user,
  "password": process.env.password,
  "port": process.env.port,
  "database": process.env.database,

    checkExpirationInterval: 10000,   // 만료된 세션이 지워지는 빈도 (milliseconds)
    expiration: 1000*60*60*2,         // 유효한 세션의 최대 기간 2시간으로 설정 (milliseconds) 
  };

  module.exports = options;