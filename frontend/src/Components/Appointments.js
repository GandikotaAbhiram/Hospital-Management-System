import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [pname, setPname] = useState('');
  const [dname, setDname] = useState('');
  const [date, setDate] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/appointment');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = { patientName: pname, doctorName: dname, date: date };

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/appointments/${editId}`, appointmentData);
        Swal.fire('Appointment updated successfully!');
      } else {
        await axios.post('http://localhost:3000/appointments', appointmentData);
        Swal.fire('Appointment added successfully!');
      }

      setPname('');
      setDname('');
      setDate('');
      setEditId(null);
      fetchAppointments();
    } catch (error) {
      console.error('Error submitting appointment:', error.response ? error.response.data : error.message);
      Swal.fire(`Error submitting appointment: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const handleEdit = (appointment) => {
    setPname(appointment.patientName);
    setDname(appointment.doctorName);
    setDate(appointment.date); 
    setEditId(appointment._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/appointments/${id}`);
      Swal.fire('Appointment deleted successfully!');
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error.response ? error.response.data : error.message);
      Swal.fire(`Error deleting appointment: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h2 style={{ marginTop: "50px", color: "red" }}>
          {editId ? "Edit Appointment" : "Add New Appointment"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className='fw-bold'>Patient Name:</label><br />
          <input
            type="text"
            name="pname"
            value={pname}
            onChange={(e) => setPname(e.target.value)}
            required
          /><br />
          <label className='fw-bold'>Doctor Name:</label><br />
          <input
            type="text"
            name="dname"
            value={dname}
            onChange={(e) => setDname(e.target.value)}
            required
          /><br />
          <label className='fw-bold'>Date:</label><br />
          <input
            type="date"
            name="date"
            style={{ padding: "18px" }}
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            required
          /><br />
          <Button variant="primary" type="submit">
            {editId ? "Update Appointment" : "Add Appointment"}
          </Button>
        </form>
      </div>
      <div className="right">
        <h2 style={{ marginTop: "50px", color: "blue" }}>Appointments List</h2>
        {appointments.map((appointment) => (
          <div key={appointment._id} className="appointment-card">
            <p><strong>Patient:</strong> {appointment.patientName}</p>
            <p><strong>Doctor:</strong> {appointment.doctorName}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <div className='appointment-card-actions'>
              <Button variant="warning" onClick={() => handleEdit(appointment)}>
                Edit
              </Button>{' '}
              <Button variant="danger" onClick={() => handleDelete(appointment._id)}>
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