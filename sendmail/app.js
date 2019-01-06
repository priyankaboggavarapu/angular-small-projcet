var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = "mongodb://localhost:27017/sender";
mongoose.connect(config)
    .connection
    .on('connected', function () {
        console.log("successfully connected to " + config)
    })
    .on('error', function (err) {
        console.log("database error " + err)
    })
var app = express();
var port = 3000;

var send = require('./send');
//send("padma4111@gmail.com");
//middleware 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/",function(req,res){
    console.log(req.body);
    send(req.body);
})

app.listen(port, function () {
    console.log("server is running on port  " + port);
})
