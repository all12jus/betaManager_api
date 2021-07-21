(()=>{
    const mongoose = require("mongoose");
    const express = require('express');
    const bodyParser = require('body-parser');
    const utils = require('./../utils');

    const Beta = require("../models/beta.model").betaModel;
    const Tester = require("../models/tester.model").testerModel;
    const router = express.Router();

    router.use([
        bodyParser.urlencoded({extended:true}),
        bodyParser.json(),
        // bodyParser.text()
    ]);

    router.get("/", async (req, res)=>{
        // res.send("OK");

        const outputObj = [];

        // const allBetaUsers = await Beta.find();

        for await (const doc of Beta.find()) {
            // use `doc`
            // var o = doc;
            console.log(doc);

            let c = await Tester.find({
                beta: mongoose.Types.ObjectId(doc.id)
            });
            // o.users = "Hello";
            // console.log(o);
            let o = {
                beta: doc,
                users: c
            };
            outputObj.push(o);
        }

        return res.json(outputObj);
    });


    router.post("/", (req, res) => {
        console.log(req.body);
        let result = utils.validateInputs(['name'], req.body);
        if (result.missingValues.length > 0){
            return res.status(400).json({ "error": "Missing Values", "missingValues": result.missingValues });
        }

        const betaItem = new Beta(result.value);
        betaItem.save((err) => {
            if (err != null) {
                return res.status(500).json({error: "Database Error: " + err});
            }
            res.json({err: (err !=null) ? err : undefined, item: betaItem});
        });

        // try {
        //
        // } catch (missingData) {
        //     console.log(req.body['name'])
        //     return res.status(400).json({ "messagE": "line 33",error: missingData });
        // }
    });

    router.post("/:beta_id/tester", async (req, res) => {
        const beta = await Beta.findOne({
            _id: req.params.beta
        }).catch((err) =>{
            return res.status(400).json({ error: err });
        });

        if (beta == null) {
            return res.status(400).json({ error: "No beta found" });
        }

        let result = utils.validateInputs(["last_name", "first_name", "email_address"], req.body);
        if (result.missingValues.length > 0){
            return res.status(400).json({ "error": "Missing Values", "missingValues": result.missingValues });
        }
        const testerItem = new Tester(result.value);
        testerItem.beta = beta;
        testerItem.save((err) => {
            if (err != null) {
                return res.status(500).json({error: "Database Error: " + err});
            }
            // res.json({err: err, item: testerItem});
            res.json({err: (err !=null) ? err : undefined, item: testerItem});
        })

        // try {
        //     let result = utils.validateInputs(["last_name", "first_name", "email_address"], req.body);
        //     const testerItem = new Tester(result);
        //     testerItem.beta = beta;
        //     testerItem.save((err) => {
        //         if (err != null) {
        //             return res.status(500).json({error: "Database Error: " + err});
        //         }
        //         // res.json({err: err, item: testerItem});
        //         res.json({err: (err !=null) ? err : undefined, item: testerItem});
        //     })
        // } catch (missingData) {
        //     return res.status(400).json({ error: missingData });
        // }
    });

    module.exports = router;
})()