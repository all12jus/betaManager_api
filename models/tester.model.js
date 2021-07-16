"use strict";
exports.__esModule = true;
exports.testerModel = exports.testerSchema = void 0;
var mongoose = require("mongoose");
var uuid = require('node-uuid');
var betaSchema = require("./beta.model");
var testerSchema = new mongoose.Schema({
    _id: { type: String, "default": uuid.v1 },
    beta: { type: mongoose.Schema.Types.ObjectId, ref: 'Beta' },
    name: String
});
exports.testerSchema = testerSchema;
var testerModel = mongoose.model('Tester', testerSchema);
exports.testerModel = testerModel;
