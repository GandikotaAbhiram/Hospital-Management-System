import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

const Appointments = () => {
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:3000/patient');
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const patientData = { name, age, gender };
        try {
            if (editId) {
                await axios.put(`http://localhost:3000/patients/${editId}`, patientData);
                Swal.fire('Patient updated successfully!');
            } else {
                await axios.post('http://localhost:3000/patients', patientData);
                Swal.fire('Patient added successfully!');
            }
            setName('');
            setAge('');
            setGender('');
            setEditId(null);
            fetchPatients();
        } catch (error) {
            console.error('Error submitting patient:', error.response ? error.response.data : error.message);
            Swal.fire(`Error submitting patient: ${error.response ? error.response.data.message : error.message}`); 
        }
    };

    const handleEdit = (patient) => {
        setName(patient.name);
        setAge(patient.age);
        setGender(patient.gender);
        setEditId(patient._id);
    };

    const handleDelete = async (id) => {
        try {
            if (!id) {
                throw new Error("Patient id is undefined");
            }
            await axios.delete(`http://localhost:3000/patients/${id}`);
            Swal.fire('Patient deleted successfully!');
            fetchPatients();
        } catch (error) {
            console.error('Error deleting patient:', error.response ? error.response.data : error.message);
            Swal.fire(`Error deleting patient: ${error.response ? error.response.data.message : error.message}`); 
        }
    };

    return (
        <div className="container">
            <div className="left">
                <h2 style={{ marginTop: "50px", color: "red" }}>Add New Patient</h2>
                <form onSubmit={handleSubmit}>
                    <label className='fw-bold'>Name:</label><br />
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    /><br />
                    <label className='fw-bold'>Age:</label><br />
                    <input
                        type="number"
                        name="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    /><br />
                    <label className='fw-bold'>Gender:</label><br />
                    <input
                        type="text"
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    /><br />
                    <Button variant="primary" type="submit">
                        {editId ? "Update Patient" : "Add Patient"}
                    </Button>{' '}
                </form>
            </div>
            <div className="right">
                <h2 style={{ marginTop: "50px", color: "blue" }}>Patients List</h2>
                {patients.map((patient) => (
                    <div key={patient._id} className="appointment-card">
                        <p><strong>Name:</strong> {patient.name}</p>
                        <p><strong>Age:</strong> {patient.age}</p>
                        <p><strong>Gender:</strong> {patient.gender}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="warning" onClick={() => handleEdit(patient)}>
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(patient._id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Appointments;