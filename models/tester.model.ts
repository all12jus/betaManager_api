const mongoose = require("mongoose");
const uuid = require('node-uuid');

const betaSchema = require("./beta.model");

const testerSchema = new mongoose.Schema({
    _id: { type: String, default: uuid.v1 },
    beta: { type: mongoose.Schema.Types.ObjectId, ref: 'Beta' },
    name: String
});

const testerModel = mongoose.model('Tester', testerSchema);

export {
    testerSchema,
    testerModel
}
