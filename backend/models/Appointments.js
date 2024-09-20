const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    patientName : {
        type : String,
        required : true
    },
    doctorName : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    }
})

module.exports = mongoose.model("Appointments",AppointmentSchema);