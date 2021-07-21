const mongoose = require("mongoose");
const express = require('express');
const Tester = require("../models/tester.model");
const router = express.Router();

router.get("/", async (req, res)=>{

    res.send("OK");
});

export default router;