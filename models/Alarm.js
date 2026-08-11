const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
     completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Alarm", alarmSchema);