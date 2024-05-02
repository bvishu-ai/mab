import "../styles/success.css";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function TimeSelect() {
  const appointmentData = useMemo(() => [
    {
      slotid: 1,
      doctorid: 1,
      patientid: null,
      doctorname: "John",
      patientname: null,
      department: "Cardiology",
      timeslot: "09:00:00",
      appointmenttype: "Consultation",
      proceduretype: null,
      suboptions: null,
      date: "2024-04-30"
    },
    {
      slotid: 2,
      doctorid: 1,
      patientid: null,
      doctorname: "John",
      patientname: null,
      department: "Cardiology",
      timeslot: "14:00:00",
      appointmenttype: "Consultation",
      proceduretype: null,
      suboptions: null,
      date: "2024-04-30"
    },
    {
      slotid: 3,
      doctorid: 2,
      patientid: null,
      doctorname: "Jane",
      patientname: null,
      department: "Cardiology",
      timeslot: "10:00:00",
      appointmenttype: "Consultation",
      proceduretype: null,
      suboptions: null,
      date: "2024-04-30"
    },
    {
      slotid: 4,
      doctorid: 2,
      patientid: null,
      doctorname: "Jane",
      patientname: null,
      department: "Cardiology",
      timeslot: "15:00:00",
      appointmenttype: "Consultation",
      proceduretype: null,
      suboptions: null,
      date: "2024-04-30"
    },
    {
      slotid: 5,
      doctorid: 3,
      patientid: null,
      doctorname: "Robert",
      patientname: null,
      department: "Cardiology",
      timeslot: "11:00:00",
      appointmenttype: "Consultation",
      proceduretype: null,
      suboptions: null,
      date: "2024-04-30"
    },
    {
      slotid: 6,
      doctorid: 3,
      patientid: null,
      doctorname: "Robert",
      patientname: null,
      department: "Cardiology",
      timeslot: "16:00:00",
      appointmenttype: "Consultation",
      proceduretype: null,
      suboptions: null,
      date: "2024-04-30"
    },
    {
      slotid: 11,
      doctorid: 1,
      patientid: null,
      doctorname: "John",
      patientname: null,
      department: "Cardiology",
      timeslot: "13:00:00",
      appointmenttype: "Procedure",
      proceduretype: "Echocardiogram",
      suboptions: null,
      date: "2024-05-01"
    },
    {
      slotid: 12,
      doctorid: 2,
      patientid: null,
      doctorname: "Jane",
      patientname: null,
      department: "Cardiology",
      timeslot: "14:30:00",
      appointmenttype: "Procedure",
      proceduretype: "Angioplasty",
      suboptions: null,
      date: "2024-05-01"
    },
    {
      slotid: 13,
      doctorid: 4,
      patientid: null,
      doctorname: "Alice",
      patientname: null,
      department: "Pediatrics",
      timeslot: "09:30:00",
      appointmenttype: "Procedure",
      proceduretype: "Vaccination",
      suboptions: null,
      date: "2024-05-01"
    },
    {
      slotid: 14,
      doctorid: 5,
      patientid: null,
      doctorname: "Emma",
      patientname: null,
      department: "Pediatrics",
      timeslot: "10:30:00",
      appointmenttype: "Procedure",
      proceduretype: "Child Checkup",
      suboptions: null,
      date: "2024-05-01"
    }
  ], []);

  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const appointmentType = sessionStorage.getItem("apptype");
  const procedureType = sessionStorage.getItem("proc");
  const department = sessionStorage.getItem("department");

  useEffect(() => {
	  console.log("Running useEffect for doctors.");
	  console.log("Filtering doctors with conditions:", appointmentType, procedureType, department);
	  
	  const filteredDoctors = Array.from(
      new Set(
        appointmentData
          .filter(
            (item) =>
              item.appointmenttype === appointmentType &&
              (item.proceduretype === procedureType || (appointmentType === "Consultation" && !item.proceduretype)) &&
              item.department.toLowerCase() === department.toLowerCase()
          )
          .map((item) => item.doctorname)
      )
    );

	  console.log("Filtered Doctors:", filteredDoctors);
	  setDoctors(filteredDoctors);
	}, [appointmentData, appointmentType, procedureType, department]);

	useEffect(() => {
	  console.log("Running useEffect for doctorSlots.");
	  console.log("Selected Doctor:", selectedDoctor);
	  console.log("Filtering slots with conditions:", selectedDoctor, appointmentType, procedureType, department);
	  
	  const filteredSlots = appointmentData
	    .filter(
	      (item) =>
	        item.doctorname === selectedDoctor &&
	        item.appointmenttype === appointmentType &&
	        (item.proceduretype === procedureType || (appointmentType === "Consultation" && !item.proceduretype)) &&
	        item.department.toLowerCase() === department.toLowerCase()
	    )
	    .map((item) => item.timeslot);

	  console.log("Filtered Slots:", filteredSlots);
	  setDoctorSlots(filteredSlots);
	}, [appointmentData, selectedDoctor, appointmentType, procedureType, department]);


  const handleDoctorChange = (e) => {
    const doctorName = e.target.value;
    console.log("Selected Doctor:", doctorName);
    setSelectedDoctor(doctorName);
  };

  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
  };

  const bookAppointment = (e) => {
  e.preventDefault();

  console.log("Selected Doctor:", selectedDoctor);
  console.log("Selected Slot:", selectedSlot);
  console.log("Appointment Type:", appointmentType);
  console.log("Procedure Type:", procedureType);
  console.log("Department:", department);

  const selectedAppointment = appointmentData.find(
    (item) =>
      item.doctorname === selectedDoctor &&
      item.timeslot === selectedSlot &&
      item.appointmenttype === appointmentType &&
      (item.proceduretype === procedureType || (appointmentType === "Consultation" && !item.proceduretype)) &&
          item.department.toLowerCase() === department.toLowerCase()
  );

  if (selectedAppointment) {
    console.log("Selected Appointment:", selectedAppointment);
    console.log("Selected Doctor:", selectedDoctor);
    console.log("Selected Slot:", selectedSlot);
    sessionStorage.setItem('Doc', selectedDoctor);
    sessionStorage.setItem('Slot', selectedSlot);
    // Perform any additional logic or navigate to the success page
    navigate("/success", { state: selectedAppointment });
  } else {
    console.log("No appointment found for the selected criteria.");
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
                <select name="doctorChoice" onChange={handleDoctorChange}>
                  <option value="">-- Select Doctor --</option>
                  {doctors.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
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
                <select name="slotTimings" onChange={handleSlotChange}>
                  <option value="">-- Select Slot --</option>
                  {doctorSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
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