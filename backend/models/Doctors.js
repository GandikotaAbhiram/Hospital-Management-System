const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    speciality : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Doctors",DoctorSchema);