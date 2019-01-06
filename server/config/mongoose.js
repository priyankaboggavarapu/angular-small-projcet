
var config = require('./config'),
    mongoose = require('mongoose');
// mongoose.connect(config.dbConnection)
mongoose.Promise = require('bluebird');
module.exports = function () {
    mongoose.connect(config.dbConnection)
        .then(function () {
            console.log("datbase connnected");
        })
        .catch(function (err) {
            console.log(err);
            console.log("Error in connecting to db");
        })

    require('../app/contact/contact.model');
    require('../app/user/user.model');
    require('../app/lookup/lookup.model');
};
