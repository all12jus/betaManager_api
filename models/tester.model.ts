const mongoose = require("mongoose");
// const uuid = require('node-uuid');

// const betaSchema = require("./beta.model");

const testerSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     default: uuid.v1
    // },
    beta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beta',
        required: [true,'No Beta found']
    },
    first_name: {
        type: String,
        required: [true,'No first_name found']
    },
    last_name: {
        type: String,
        required: [true,'No last_name found']
    },
    email_address: {
        type: String,
        unique: true,
        required: [true, "No email_address found"]
    }

}, { timestamps: true });

const testerModel = mongoose.model('Tester', testerSchema);

export {
    testerSchema,
    testerModel
}
