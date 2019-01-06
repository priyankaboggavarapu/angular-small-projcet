emailer = function (to) {
    var nodemailer = require('nodemailer');
    var smtpConfig = {
        host: 'cp-32.webhostbox.net',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'padmab@k3informatics.com',
            pass: 'test@12345'
        }
    };

    var transporter = nodemailer.createTransport(smtpConfig);
    console.log(to);
    var mailOptions = {
        from: 'padmab@k3informatics.com', // sender address
        to: to.toAddress, // list of receivers
        subject: 'Welcome to k3 informatics ', // Subject line
        text: ' Welcome to k3informatics.', // plaintext body
      //  html: '<b>Dear Padma,Welcome to k3informatics.</b>',
       // html: '<b>Thank u and successfully created.</b>'// html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports = emailer;
