
const og = require('./orm/nodejs-orm');
og.connect({
    host: 'localhost',//数据库地址
    port:'3306', // 端口
    user: 'root',//用户名，没有可不填
    password: '123456',//密码，没有可不填
    database: 'location',//数据库名称
		timezone: "08:00"  // 时区
});



module.exports = og
