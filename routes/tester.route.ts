(()=>{
    const mongoose = require("mongoose");
    const express = require('express');
    const Tester = require("../models/tester.model");
    const router = express.Router();

    router.get('/', async  (req, res) => {
        const users = await Tester.find();
        return res.json(users);
    });

    module.exports = router;
})()