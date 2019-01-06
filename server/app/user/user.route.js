var users = require('../../app/user/user.controller'),

    passport = require('passport');
module.exports = function (app) {
    console.log(users);
    app.post("/api/register", users.register, users.authenticateUser);
    app.post("/api/login", users.authenticateUser);
    app.get('/api/memberinfo', users.memberinfo);
    app.get('/api/logout', users.logout);
  

};