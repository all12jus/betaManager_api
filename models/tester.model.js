"use strict";
exports.__esModule = true;
exports.testerModel = exports.testerSchema = void 0;
var mongoose = require("mongoose");
var uuid = require('node-uuid');
var betaSchema = require("./beta.model");
var testerSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     default: uuid.v1
    // },
    beta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beta',
        required: [true, 'No Beta found']
    },
    first_name: {
        type: String,
        required: [true, 'No first_name found']
    },
    last_name: {
        type: String,
        required: [true, 'No last_name found']
    },
    email_address: {
        type: String,
        required: [true, "No email_address found"]
    }
}, { timestamps: true });
exports.testerSchema = testerSchema;
var testerModel = mongoose.model('Tester', testerSchema);
exports.testerModel = testerModel;
