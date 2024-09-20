import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [name, setName] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:3000/doctor'); 
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const doctorData = { name, speciality };
        try {
            if (editId) {
                await axios.put(`http://localhost:3000/doctors/${editId}`, doctorData);
                Swal.fire('Doctor updated successfully!');
            } else {
                await axios.post('http://localhost:3000/doctors', doctorData);
                Swal.fire('Doctor added successfully!');
            }
            setName('');
            setSpeciality('');
            setEditId(null);
            fetchDoctors();
        } catch (error) {
            console.error('Error submitting doctor:', error.response ? error.response.data : error.message);
            Swal.fire(`Error submitting doctor: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const handleEdit = (doctor) => {
        setName(doctor.name);
        setSpeciality(doctor.speciality);
        setEditId(doctor._id);
    };

    const handleDelete = async (id) => {
        try {
            if (!id) {
                throw new Error("Doctor ID is undefined");
            }
            await axios.delete(`http://localhost:3000/doctors/${id}`);  
            Swal.fire('Doctor deleted successfully!');
            fetchDoctors();
        } catch (error) {
            console.error('Error deleting doctor:', error.response ? error.response.data : error.message);
            Swal.fire(`Error deleting doctor: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <div className="container">
            <div className="left">
                <h2 style={{ marginTop: "50px", color: "red" }}>Add New Doctor</h2>
                <form onSubmit={handleSubmit}>
                    <label className='fw-bold'>Name:</label><br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br />
                    <label className='fw-bold'>Speciality:</label><br />
                    <input type="text" value={speciality} onChange={(e) => setSpeciality(e.target.value)} required /><br />
                    <Button variant="primary" type="submit">Add Doctor</Button>{' '}
                </form>
            </div>
            <div className="right">
            <h2 style={{ marginTop: "50px", color: "blue" }}>Doctors List</h2>
                {doctors.map((doctor) => (
                    <div key={doctor._id} className="appointment-card">
                        <p><strong>Name: </strong>{doctor.name}</p>
                        <p><strong>Speciality: </strong>{doctor.speciality}</p>
                        <div>
                            <Button variant="warning" onClick={() => handleEdit(doctor)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(doctor._id)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Doctors;
