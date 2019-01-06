var lookup = require('mongoose').model('lookup');

var lookupCtrl = {};

lookupCtrl.getAll = function (req, res) {
    var params = req.body;
    var promise = lookup.find({}).exec();
    promise.then(function (data) {
        res.json(data);
    }).catch(function (error) {
        // console.log(error);
        res.status(500).json({ error: error });
    });

};

lookupCtrl.add = function (req, res) {
    var params = req.body;
    var findQuery = "";
    if (params.lookuptype == "Courses") {
        findQuery = { "Courses.CourseName": params.data.CourseName };
    }
    // else if (params.lookuptype == "Batches") {
    //     findQuery = { "Batches.BatchName": params.data.BatchName };
    // }
    else {
        res.json({ "status": "Invalid info" })
    }
    if (findQuery != "") {

        var promise = lookup.find(findQuery).exec();
        promise.then(function (data) {
            let result = JSON.parse(JSON.stringify(data));
            console.log(result);
            if (result.length > 0) {
                res.json({ status: "Course Already Exists" });
            }
            else {
                //  res.json({status:"Course doesnot  Exists"}); 
                var query = "";
                if (params.lookuptype == "Courses") {
                    query = { $push: { "Courses": params.data } };
                }
                // else if (params.lookuptype = "Batches") {
                //     query = { $push: { "Batches": params.data } };
                // }
                var promise = lookup.findByIdAndUpdate(params.Id, query,
                    { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
                promise.then(function (data) {
                    res.json(data);
                })
                // promise.then(function (data) {
                //     res.json(data);
                // })

            }
        });
    }
};


module.exports = lookupCtrl;