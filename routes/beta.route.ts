const mongoose = require("mongoose");
const express = require('express');
const Beta = require("../models/beta.model");
const router = express.Router();

router.get("/", async (req, res)=>{

    res.send("OK");
});

export default router;