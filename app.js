var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Beta = require("./models/beta.model").betaModel;
var Tester = require("./models/tester.model").testerModel;
var BetaRouter = require("./routes/beta.route");
var TesterRouter = require("./routes/tester.route");
var port = process.env.PORT || 5555;
var app = express();
app.set('json spaces', 2);
var databaseConnectionError = null;
app.use(function (req, res, next) {
    if (databaseConnectionError === null) {
        return next();
    }
    else {
        return next(databaseConnectionError);
    }
});
/*

    / - base route nothing special here. maybe api documentation
        /beta
            √ - GET = gets current list of the betas
            √ - POST = creates a new beta
        /beta/:beta_id
            √ - GET = gets current beta and list of testers for this beta
            √ - POST = Nothing
            - DELETE = removes current beta
            - PUT = Updates current beta
        /beta/:beta_id/tester
            √ - GET = get list of testers for the current beta
            √ - POST = creates new tester and adds them to this beta
        /tester
            √ - GET = gets current list of all testers
            √ - POST = Nothing
        /tester/:tester_id
            - GET = gets current tester
            - POST = Nothing
            - DELETE - Removes current tester
            - PUT = Updates current tester - will be useful for changing the status of the applicant.
    /404.html - need custom error page.

 */
app.get('/', function (req, res) {
    res.send("OK");
});
app.use('/beta', BetaRouter);
app.use('/tester', TesterRouter);
var ObjectId = mongoose.ObjectId;
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
app.get("/clearData", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Beta.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, Tester.deleteMany({})];
            case 2:
                _a.sent();
                res.send("OK");
                return [2 /*return*/];
        }
    });
}); });
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
