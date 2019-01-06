var mongoose = require('mongoose'),
    crypto = require('crypto'),
    bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');
var validate = require('mongoose-validator');


Schema = mongoose.Schema;
var UserSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    Email: { type: String, index: true, unique: true, required: true },
    confirmPassword: { type: String, required: true },
    password: { type: String, required: true }

});

UserSchema.methods.authenticate = function (password) {
    var md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');
    return this.password === md5;
};
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne({
        userName: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};
UserSchema.pre('save', function (next) {
    var user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        });
    });
}

);
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.plugin(uniqueValidator);
mongoose.model('User', UserSchema);