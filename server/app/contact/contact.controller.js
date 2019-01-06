var contact = require('mongoose').model('contact');
var rp = require('request-promise');
var jwt = require('jwt-simple');
var contactCtrl = {};

contactCtrl.create = function (req, res) {
    var contactSchema = new contact(req.body);
    var promise = contactSchema.save();
    promise.then(function (data) {
        //  sendEmail(contact.Email);
        res.json({
            "Status": "User is a created successfully",
            data: data,
        })
        sendEmail(req.body.Email);
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ "Error": "Enter Details " });
    });

};
function sendEmail(toAddress) {
    var options = {
        method: 'POST',
        uri: 'http://localhost:3000',
        body: {
            toAddress: toAddress
        },
        json: true // Automatically stringifies the body to JSON 
    };

    rp(options)
        .then(function (parsedBody) {
            //  res.json(parsedBody);

        })
        .catch(function (err) {
            //  res.status(500).json({ error: error });
        });
}
module.exports = contactCtrl;