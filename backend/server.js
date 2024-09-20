const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Patients = require("./models/patients");
const Doctors = require("./models/doctors");
const Appointments = require("./models/appointments");

mongoose.connect("mongodb+srv://abhiramgandikota86:Abhiram2003@cluster0.h8xvhzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        useUnifiedTopology:true,
        useNewUrlParser:true
    }
)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error is ",err))

const app = express();


app.use(cors());
app.use(express.json());

//get all the patients

app.get("/patient", async (req,res) => {
    try{
        const patients = await Patients.find();
        res.json(patients);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});

//add a new patient

app.post("/patients",async (req,res) => {
    try{
        const {name,age,gender} = req.body;
        const patient = new Patients({
            name,
            age,
            gender
        })
        await patient.save();
        res.json(patient);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});


// Update a patient data
app.put("/patients/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid patient ID format" });
    }

    try {
        const patient = await Patients.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        patient.name = req.body.name || patient.name;
        patient.age = req.body.age || patient.age;
        patient.gender = req.body.gender || patient.gender;

        await patient.save();
        res.json(patient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//get a particular patient data
app.get("/patient/:id",async (req,res) => {
    try{
        const patient = await Patients.findById(req.params.id);
        res.json(patient);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});

//delete a patient data
app.delete("/patients/:id",async (req,res) => {
    try{
        const patient = await Patients.findByIdAndDelete(req.params.id);
        res.json({message : "Patient deleted successfully"});
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});

//Doctor Routes
//get all the doctors
app.get("/doctor",async (req,res) => {
    try {
        const doctors = await Doctors.find();
        res.json(doctors);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});

//add a new doctor
app.post("/doctors",async (req,res) => {
    try {
        const {name,speciality} = req.body;
        const doctor = new Doctors({
            name,speciality
        })
        await doctor.save();
        res.json(doctor);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});

//get a particular doctor data
app.get("/doctor:/id",async (req,res) => {
    try {
        const doctor = await Doctors.findById(req.params.id);
        res.json(doctor);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
})

//update a doctor data
app.put("/doctors/:id",async (req,res) => {
    try {
        const doctor = await Doctors.findById(req.params.id);
        if(!doctor){
            return res.status(404).json({message : "Doctor not found"});
        }
        doctor.name = req.body.name;
        doctor.speciality = req.body.speciality;
        await doctor.save();
        res.json(doctor);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});

//delete a doctor data
app.delete("/doctors/:id",async (req,res) => {
    try {
        const doctor = await Doctors.findByIdAndDelete(req.params.id);
        res.json({message : "Doctor deleted successfully"});
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});

//Appointments Routes
//get all the appointments
app.get("/appointment",async (req,res) => {
    try {
        const appointments = await Appointments.find();
        res.json(appointments);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});

//add a new appointment
app.post("/appointments",async (req,res) => {
    try {
        const {patientName,doctorName,date} = req.body;
        const appointment = new Appointments({
            patientName,doctorName,date
        })
        await appointment.save();
        res.json(appointment);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});

//get a particular appointment data
app.get("/appointment/:id",async (req,res) => {
    try {
        const appointment = await Appointments.findById(req.params.id);
        res.json(appointment);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});

//update a appointment data
app.put("/appointments/:id",async (req,res) => {
    try {
        const appointment = await Appointments.findById(req.params.id);
        if(!appointment){
            return res.status(404).json({message : "Appointment not found"});
        }
        appointment.patientName = req.body.patientName;
        appointment.doctorName = req.body.doctorName;
        appointment.date = req.body.date;
        await appointment.save();
        res.json(appointment);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});

//delete a appointment data
app.delete("/appointments/:id",async (req,res) => {
    try {
        const appointment = await Appointments.findByIdAndDelete(req.params.id);
        res.json({message : "Appointment deleted successfully"});
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});


app.listen(3000,(req,res) => {
    console.log("Server is running on port 3000");
});