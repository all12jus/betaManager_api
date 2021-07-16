const express = require('express');
const mongoose = require('mongoose');
const Beta = require("./models/beta.model").betaModel;
const Tester = require("./models/tester.model").testerModel;

const port = process.env.PORT || 5555;

const app = express();

let databaseConnectionError: string|null = null;

app.use((req, res, next) => {
    if (databaseConnectionError === null){
        return next();
    } else {
        return next(databaseConnectionError);
    }
});

app.get('/',(req, res) => {
    res.send("OK")
});

app.get("/create/beta", (req, res) => {
    const betaItem = new Beta({ name : `Testing: ${Date.now()}` });
    betaItem.save((err) => {
        res.json({err: err, item: betaItem});
    });
});

app.get("/create/:beta/tester", (req, res) => {
    Beta.findOne({ id: req.params.beta }, (err, beta) => {
        if (err){
            res.json({err: err});
            return;
        }
        const testerItem = new Tester({ beta:beta, name : `Testing: ${Date.now()}` });
        testerItem.save((err1) => {
            res.json({err: err1, item: testerItem});
        });
    });
});


mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(error) {
    if (error !== null){
        databaseConnectionError = error.message;
        // return
    }
    // Check error in initial connection. There is no 2nd param to the callback.
    app.listen(port, () => {
        console.log(`Started: Listening on ${port}`);
    });
});