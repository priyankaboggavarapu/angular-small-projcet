
var lookupCtrl = require('../../app/lookup/lookup.controller');

module.exports = function (app) {
    app.route("/api/lookup/add").post(lookupCtrl.add);
    app.route("/api/lookup/getAll").get(lookupCtrl.getAll);
}
