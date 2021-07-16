const mongoose = require("mongoose");

const testerSchema = new mongoose.Schema({
    name: String
});

const testerModel = mongoose.model('Tester', testerSchema);

export {
    testerSchema,
    testerModel
}
