(()=>{
    const mongoose = require("mongoose");
    const express = require('express');
    const bodyParser = require('body-parser');

    const Tester = require("../models/tester.model").testerModel;
    const router = express.Router();

    router.use([
        bodyParser.urlencoded({extended:true}),
        bodyParser.json(),
        bodyParser.text()
    ]);

    router.get('/', async  (req, res) => {
        const users = await Tester.find();
        return res.json(users);
    });

    router.get('/:tester_id', async  (req, res) => {
        const tester = await Tester.findByID(req.params['tester_id']);
        return res.json(tester);
    });

    module.exports = router;
})()