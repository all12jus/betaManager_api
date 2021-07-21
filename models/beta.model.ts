const mongoose = require("mongoose");
// const uuid = require('node-uuid');

const betaSchema = new mongoose.Schema({
    // _id: { type: String, default: uuid.v1 },
    name: String
}, { timestamps: true });

const betaModel = mongoose.model('Beta', betaSchema);

export {
    betaSchema,
    betaModel
}
