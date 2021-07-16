var express = require('express');
var mongoose = require('mongoose');
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
