"use strict";
exports.__esModule = true;
exports.betaModel = exports.betaSchema = void 0;
var mongoose = require("mongoose");
var uuid = require('node-uuid');
var betaSchema = new mongoose.Schema({
    _id: { type: String, "default": uuid.v1 },
    name: String
});
exports.betaSchema = betaSchema;
var betaModel = mongoose.model('Beta', betaSchema);
exports.betaModel = betaModel;
