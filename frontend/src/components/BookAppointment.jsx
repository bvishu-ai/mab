import React, { useState, useEffect } from "react";
import "../styles/bookappointment.css";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const BookAppointment = ({ setModalOpen, ele }) => {
  const [formDetails, setFormDetails] = useState({
    date: "",
    time: "",
    age: "",
    dayOfBooking: "", // Extracted from the current system time
    procedureType: "consultation", // Default to "Consultation"
    procedure: "",
    channel: "",
    month: "", // Extracted from the current system time
  });

  const [showProcedureField, setShowProcedureField] = useState(false); // State to control the visibility of the procedure field

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    const currentDate = new Date();
    const day = weekday[currentDate.getDay()];
    const month = currentDate.toLocaleString("default", { month: "long" });

    // Set the default values for day and month in the form
    setFormDetails({
      ...formDetails,
      dayOfBooking: day.toString(),
      month,
    });
  }, []);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const selectProcedureType = (e) => {
    const { value } = e.target;
    setFormDetails({
      ...formDetails,
      procedureType: value,
    });
    setShowProcedureField(value === "procedure");
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/appointment/bookappointment",
        {
          doctorId: ele?._id,
          user_id: token,
          department_name: `${ele?.department}`,
          dayOfBooking: formDetails.dayOfBooking,
          procedureType: formDetails.procedureType, // Changed to procedureType
          procedure: formDetails.procedure,
          month: formDetails.month,
        }
      );
      setModalOpen(false);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div className="modal flex-center">
        <div className="modal__content">
          <h2 className="page-heading">Book Appointment</h2>
          <IoMdClose
            onClick={() => {
              setModalOpen(false);
            }}
            className="close-btn"
          />
          <div className="register-container flex-center book">
            <form className="register-form">
              <div className="select-container">
                <input
                required
                type="date"
                name="date"
                className="form-input"
                value={formDetails.date}
                onChange={inputChange}
              />
              <br />
              <br />
              {/* Additional input fields */}
                <label>
                  Select Appointment Type:
                  <br/>
                  <br/>
                  <select
                    name="procedureType"
                    value={formDetails.procedureType}
                    onChange={selectProcedureType}
                  >
                    <option value="consultation">Consultation</option>
                    <option value="procedure">Procedure</option>
                  </select>
                </label>
              </div>
              {showProcedureField && (
                <div className="select-container">
                  <label>
                    Select Procedure:
                    <br />
                    <br />
                    <select
                      name="procedure"
                      value={formDetails.procedure}
                      onChange={inputChange}
                    >
                      {ele?.procedures?.map((procedure, index) => (
                        <option key={index} value={procedure}>
                          {procedure}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
              <button
                type="submit"
                className="btn form-btn"
                onClick={bookAppointment}
              >
                Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;