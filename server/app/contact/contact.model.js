
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var contactSchema = new Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    CurrentLocation: { type: String, required: true },
    University: { type: String, required: true },
    MobileNo: { type: Number, required: true },
    Message: { type: String, required: true },
    CreatedDate: { type: Date, default: Date.now },



})

contactSchema.plugin(uniqueValidator);

mongoose.model("contact", contactSchema);
