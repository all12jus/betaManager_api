const mongoose = require("mongoose");

const betaSchema = new mongoose.Schema({
    name: String
});

const betaModel = mongoose.model('Beta', betaSchema);

export {
    betaSchema,
    betaModel
}
