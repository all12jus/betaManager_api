(()=>{
    const mongoose = require("mongoose");
    const express = require('express');
    const Beta = require("../models/beta.model");
    const router = express.Router();

    router.get("/", async (req, res)=>{

        res.send("OK");
    });

    router.post("/", (req, res) => {
        // TODO: actually pull info from the body.
        const betaItem = new Beta({ name : `Testing: ${Date.now()}` });
        betaItem.save((err) => {
            res.json({err: err, item: betaItem});
        });
    });

    module.exports = router;
})()