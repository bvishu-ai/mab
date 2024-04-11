import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import toast from "react-hot-toast";
import { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

function Register() {
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    userEmail: "",
    password: "",
    userName: "",
    age: "",
    gender: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    firstname: "",
    lastname: "",
    userEmail: "",
    password: "",
    userName: "",
    age: "",
    gender: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const navigate = useNavigate();

  const { transcript, resetTranscript } = useSpeechRecognition();
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const fields = ["firstname", "lastname", "userEmail", "password", "userName", "age", "gender"];
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [spokenFields, setSpokenFields] = useState({});

  const handleVoiceInput = () => {
    resetTranscript();
    const recognition = new SpeechRecognition();
    recognition.start();
    recognition.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript;
      setFormDetails({ ...formDetails, [fields[currentFieldIndex]]: voiceInput });
      recognition.stop();
      if (currentFieldIndex < fields.length - 1) {
        setCurrentFieldIndex(currentFieldIndex + 1);
      }
    };
  };

  const speakInstructions = (field) => {
    if (!spokenFields[field]) {
      const instructions = `Please say your ${field}.`;
      const speech = new SpeechSynthesisUtterance();
      speech.text = instructions;
      speechSynthesis.speak(speech);
      setSpokenFields({ ...spokenFields, [field]: true });
    }
  };

  useEffect(() => {
    if (currentFieldIndex < fields.length && formDetails[fields[currentFieldIndex]] === "") {
      speakInstructions(fields[currentFieldIndex]);
    }
  }, [currentFieldIndex, formDetails]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        // Start voice input when spacebar is pressed
        handleVoiceInput();
      } else if (event.code === "Enter") {
        // Submit the form when Enter is pressed
        formSubmit(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleVoiceInput]);

  useEffect(() => {
    if (transcript.toLowerCase() === "confirm") {
      setCurrentFieldIndex(currentFieldIndex + 1);
    }
  }, [transcript, currentFieldIndex]);

  const validateField = (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "firstname":
      case "lastname":
      case "userName":
        errorMessage = value.trim() ? "" : "Field cannot be empty";
        break;
      case "userEmail":
        errorMessage = /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email format";
        break;
      case "password":
        errorMessage = value.length >= 6 ? "" : "Password must be at least 6 characters";
        break;
      case "age":
        errorMessage = value >= 18 ? "" : "You must be at least 18 years old";
        break;
      case "gender":
        errorMessage = value ? "" : "Field cannot be empty";
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    let hasError = false;

    // Validate each field
    fields.forEach((field) => {
      const errorMessage = validateField(field, formDetails[field]);
      errors[field] = errorMessage;
      if (errorMessage) {
        hasError = true;
      }
    });

    // If any error is found, display error messages and return
    if (hasError) {
      setErrorMessages(errors);
      setErrorMessage("Please fill out all required fields correctly");
      return;
    }

    try {
      const formData = {
        first_name: formDetails.firstname,
        last_name: formDetails.lastname,
        userEmail: formDetails.userEmail,
        password: formDetails.password,
        userName: formDetails.userName,
        age: formDetails.age,
        gender: formDetails.gender
      };

      const response = await axios.post(
        'http://localhost:5000/users/signup',
        JSON.stringify(formData),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid registration details"); // Set error message
      } else {
        setErrorMessage("Failed to register. Please try again later.");
      }
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <h2 className="form-heading">Register</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Render error message if present */}
        <form onSubmit={formSubmit} className="register-form">
          {fields.map((field, index) => (
            <div key={index} className="input-container">
              <input
                type="text"
                name={field}
                className="form-input"
                placeholder={`enter your ${field}`}
                value={formDetails[field]}
                onChange={(e) => setFormDetails({ ...formDetails, [field]: e.target.value })}
              />
              <button
                type="button"
                className="btn voice-btn"
                onClick={handleVoiceInput}
              >
                Voice
              </button>
              {errorMessages[field] && <span className="error-message">{errorMessages[field]}</span>}
            </div>
          ))}
          
          <button type="submit" className="btn form-btn">
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <NavLink
            className="login-link"
            to={"/login"}
          >
            Log in
          </NavLink>
        </p>
        <p></p>
        <p></p>
      </div>
    </section>
  );
}

export default Register;
