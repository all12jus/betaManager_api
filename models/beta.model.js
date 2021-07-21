"use strict";
exports.__esModule = true;
exports.betaModel = exports.betaSchema = void 0;
var mongoose = require("mongoose");
// const uuid = require('node-uuid');
var betaSchema = new mongoose.Schema({
    // _id: { type: String, default: uuid.v1 },
    name: String
}, { timestamps: true });
exports.betaSchema = betaSchema;
var betaModel = mongoose.model('Beta', betaSchema);
exports.betaModel = betaModel;
