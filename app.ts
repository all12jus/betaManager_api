const express = require('express');
const mongoose = require('mongoose');

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