
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var courseSchema = new Schema({
    CourseName: { type: String, required: true, unique: true },
    Category: { type: String, required: true }
})
// var batcheSchema = new Schema({
//     CourseName: { type: String },
//     BatchName: { type: String },
//     Faculity: { type: String },
//     StartDate: { type: String },
//     Status: { type: String }
// })
var lookupSchema = new Schema({

    Courses: [courseSchema],
   // Batches: [batcheSchema],

    CreatedDate: { type: Date, default: Date.now },
});

lookupSchema.plugin(uniqueValidator);

mongoose.model("lookup", lookupSchema);
