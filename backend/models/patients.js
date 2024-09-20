const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Patients",PatientSchema);