var express = require('express');
var mongoose = require('mongoose');
var Beta = require("./models/beta.model").betaModel;
var Tester = require("./models/tester.model").testerModel;
var port = process.env.PORT || 5555;
var app = express();
var databaseConnectionError = null;
app.use(function (req, res, next) {
    if (databaseConnectionError === null) {
        return next();
    }
    else {
        return next(databaseConnectionError);
    }
});
app.get('/', function (req, res) {
    res.send("OK");
});
app.get("/create/beta", function (req, res) {
    var betaItem = new Beta({ name: "Testing: " + Date.now() });
    betaItem.save(function (err) {
        res.json({ err: err, item: betaItem });
    });
});
app.get("/create/:beta/tester", function (req, res) {
    Beta.findOne({ id: req.params.beta }, function (err, beta) {
        if (err) {
            res.json({ err: err });
            return;
        }
        var testerItem = new Tester({ beta: beta, name: "Testing: " + Date.now() });
        testerItem.save(function (err1) {
            res.json({ err: err1, item: testerItem });
        });
    });
});
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error !== null) {
        databaseConnectionError = error.message;
        // return
    }
    // Check error in initial connection. There is no 2nd param to the callback.
    app.listen(port, function () {
        console.log("Started: Listening on " + port);
    });
});
