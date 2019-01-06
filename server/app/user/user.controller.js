var User = require('mongoose').model('User'),
    passport = require('passport'),
    jwt = require('jwt-simple');
config = require("../../config/config"),
    bcrypt = require('bcryptjs');
var userCtrl = {};
var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

userCtrl.authenticateUser = function (req, res) {
    console.log(req.body);
    User.findOne({
        userName: req.body.userName
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.send({
                success: false,
                msg: 'Authentication failed. User not found.'
            });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    console.log(user);
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    res.json({
                        status: "Success",
                        userDetails: {
                            userName: user.userName,
                            Id: user._id,
                            //  role: user.role,
                            token: 'JWT ' + token
                        }

                    });
                    //req.body.tokenDetails= 'JWT ' + token;
                    //next();

                } else {
                    res.send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }
    });
};

userCtrl.register = function (req, res, next) {

    var params = req.body;
    //TODO: To be decided at the time of hosting.
    //params.correspondingAdmin = { Id: "5961876d094a89586013bcb8", userName: "admin" };
    var user = new User(params);

    var promise = user.save();

    promise.then(function (data) {
        console.log("user created");
        next()
    })

        .catch(function (error) {
            console.log(error);
            res.status(403).send({
                success: false,
                msg: 'Error occured while creating user.'
            });
        })

};
userCtrl.encryptPassword = function (req, res, next) {

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            res.json({ "Error": "Error in Creating password" });
        }
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                res.json({ "Error": "Error in Creating password" });
            }
            req.body.password = hash;
            next();
        });
    });
};
userCtrl.memberinfo = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        var promise = User.findOne({
            userName: decoded.userName
        }).exec();

        promise.then(function (user) {
            res.json({
                success: true,
                msg: 'Welcome in the member area ' + user.userName + '!'
            });
        })

            .catch(function (error) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            })

    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
};
getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};
userCtrl.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};
userCtrl.create = function (req, res, next) {
    var user = new User(req.body);
    var promise = UserSchema.save();
    promise.then(function (user) {
        res.json(user);
    })
        .catch(function (error) {
            res.status(500).json({ error: error });
        });
};

// userCtrl.update = function (req, res) {
//     var params = req.body;
//     var promise = User.findByIdAndUpdate(params._id, { $set: 
//         { "firstName": params.firstName, 
//         "lastName" : params.lastName, 
//         "email"    : params.email, 
//         "university" : params.university, 
//         "location" : params.location, 
//         "role" : params.role } },
//         { safe: true, upsert: true, new: true }).exec();
//     promise.then(function (data) {
//         res.send(data);
//     })
//         .catch(function (error) {
//             res.status(500).send({ error: error });
//         });
// };


module.exports = userCtrl;
