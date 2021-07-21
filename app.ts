const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Beta = require("./models/beta.model").betaModel;
const Tester = require("./models/tester.model").testerModel;
const BetaRouter = require("./routes/beta.route");
const TesterRouter = require("./routes/tester.route");

const port = process.env.PORT || 5555;

const app = express();
app.set('json spaces', 2)

let databaseConnectionError: string|null = null;

app.use((req, res, next) => {
    if (databaseConnectionError === null){
        return next();
    } else {
        return next(databaseConnectionError);
    }
});


/*

    / - base route nothing special here. maybe api documentation
        /beta
            - GET = gets current list of the betas
            - POST = creates a new beta
        /beta/:beta_id
            - GET = gets current beta and list of testers for this beta
            - POST = Nothing
            - DELETE = removes current beta
            - PUT = Updates current beta
        /beta/:beta_id/tester
            - GET = get list of testers for the current beta
            - POST = creates new tester and adds them to this beta
        /tester
            - GET = gets current list of all testers
            - POST = Nothing
        /tester/:tester_id
            - GET = gets current tester
            - POST = Nothing
            - DELETE - Removes current tester
            - PUT = Updates current tester - will be useful for changing the status of the applicant.


 */

app.get('/',(req, res) => {
    res.send("OK")
});

app.use('/beta', BetaRouter);
app.use('/tester', TesterRouter);


const ObjectId = mongoose.ObjectId;

// app.get('/list', async  (req, res) => {
//     console.log("Coming soon");
//
//     // var users = await Tester.find()
//
//     const outputObj = [];
//
//     // const allBetaUsers = await Beta.find();
//
//     for await (const doc of Beta.find()) {
//         // use `doc`
//         // var o = doc;
//         console.log(doc);
//
//         let c = await Tester.find({
//             beta: mongoose.Types.ObjectId(doc.id)
//         });
//         // o.users = "Hello";
//         // console.log(o);
//         let o = {
//             beta: doc,
//             users: c
//         };
//         outputObj.push(o);
//     }
//
//     return res.json(outputObj);
//
//     // return res.send("OK");
// });

// app.get("/create/beta", (req, res) => {
//     const betaItem = new Beta({ name : `Testing: ${Date.now()}` });
//     betaItem.save((err) => {
//         res.json({err: err, item: betaItem});
//     });
// });

// app.get("/create/:beta/tester", (req, res) => {
//     Beta.findOne({ _id: req.params.beta }, (err, beta) => {
//         if (err || beta == null){
//             res.json({err: err});
//             return;
//         }
//         const testerItem = new Tester({
//             beta:beta,
//             first_name : `Testing: ${Date.now()}`,
//             last_name:"EEVVEVE" ,
//             email_address: "test@test.com"
//         });
//         testerItem.save((err1) => {
//             res.json({err: err1, item: testerItem});
//         });
//     });
// });

// app.post("/test", [
//     bodyParser.urlencoded({extended:true})
//     , bodyParser.json()
//     , bodyParser.text()
// ], (req, res) => {
//     console.log(req.body);
//     res.send({
//         "body": req.body,
//         "date" : new Date().toLocaleTimeString()
//     });
// })

app.get("/clearData", async (req, res) => {
   await Beta.deleteMany({});
   await Tester.deleteMany({});
   res.send("OK");
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