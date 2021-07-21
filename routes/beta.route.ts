(()=>{
    const mongoose = require("mongoose");
    const express = require('express');
    const bodyParser = require('body-parser');
    const utils = require('./../utils');

    const Beta = require("../models/beta.model");
    const Tester = require("../models/tester.model");
    const router = express.Router();

    router.use([
        bodyParser.urlencoded({extended:true}),
        bodyParser.json(),
        bodyParser.text()
    ]);

    router.get("/", async (req, res)=>{
        res.send("OK");
    });

    router.post("/", (req, res) => {
        try {
            let result = utils.validateInputs(['name'], req.body);
            const betaItem = new Beta(result);
            betaItem.save((err) => {
                if (err == null) {
                    return res.status(500).json({error: "Database Error: " + err});
                }
                res.json({err: err, item: betaItem});
            });
        } catch (missingData) {
            return res.status(400).json({ error: missingData });
        }
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

        try {
            let result = utils.validateInputs(["last_name", "first_name", "email_address"], req.body);
            const testerItem = new Tester(result);
            testerItem.save((err) => {
                if (err == null) {
                    return res.status(500).json({error: "Database Error: " + err});
                }
                res.json({err: err, item: testerItem});
            })
        } catch (missingData) {
            return res.status(400).json({ error: missingData });
        }
    });

    module.exports = router;
})()