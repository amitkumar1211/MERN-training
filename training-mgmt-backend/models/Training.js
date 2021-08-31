const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const TrainingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
        default: "Open",
    },
    reference: {
        type: String,
        required: false,
    }

});

module.exports = Training = mongoose.model("training", TrainingSchema);