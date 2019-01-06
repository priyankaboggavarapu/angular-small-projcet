const express = require("express");
const bodyParser = require("body-parser");
module.exports = function () {
  var app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  var routes = require("../app/user/user.route.js")(app);
  var route = require("../app/lookup/lookup.route.js")(app);
   var route = require("../app/contact/contact.route.js")(app);
  return app;
}



