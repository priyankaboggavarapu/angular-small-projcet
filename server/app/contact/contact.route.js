
var contactCtrl = require('../../app/contact/contact.controller');

module.exports = function (app) {
    app.route("/api/contact/create").post(contactCtrl.create);
  
}
