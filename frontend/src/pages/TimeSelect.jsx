import "../styles/success.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TimeSelect() {
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState({
    doctorChoice: "",
    slotTimings: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [doctorSlots, setDoctorSlots] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/slots/doctors",
        {}
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  const fetchDoctorSlots = async (doctorName) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/availableslots",
        { doctorName }
      );
      setDoctorSlots(response.data);
    } catch (error) {
      console.error("Failed to fetch doctor slots:", error);
    }
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
    if (name === "doctorChoice") {
      fetchDoctorSlots(value);
    }
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    try {
      navigate("/success");
    } catch (error) {
      console.error("Failed to book appointment:", error);
    }
  };

  return (
    <section className="success-section flex-center">
      <div className="success-container flex-center">
        <h2 className="page-heading">
          Select your Doctor and their available Time Slot
        </h2>
        <div className="register-container flex-center book">
          <form className="register-form">
            <div className="select-container">
              <label>
                Select Your Doctor:
                <br />
                <br />
                <select name="doctorChoice" onChange={inputChange}>
                  <option value="">-- Select Doctor --</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <br />
              <label>
                Select Appointment Time:
                <br />
                <br />
                <select name="slotTimings" onChange={inputChange}>
                  <option value="">-- Select Slot --</option>
                  {doctorSlots.map((slot) => (
                    <option key={slot.id} value={slot.timing}>
                      {slot.timing}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="btn form-btn"
              onClick={bookAppointment}
            >
              Confirm Appointment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default TimeSelect;