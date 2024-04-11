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
    confpassword: "",
    userName: "",
    age: "",
    gender: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    userEmail: "",
    password: "",
    confpassword: "",
    userName: "",
    age: "",
    gender: "",
  });
  const navigate = useNavigate();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const fields = ["firstname", "lastname", "userEmail", "password", "confpassword", "userName", "age", "gender"];
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
        handleVoiceInput();
      } else if (event.code === "Enter") {
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

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });

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
      case "confpassword":
        errorMessage = value === formDetails.password ? "" : "Passwords do not match";
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

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    Object.keys(formDetails).forEach((key) => {
      switch (key) {
        case "firstname":
        case "lastname":
        case "userName":
        case "userEmail":
        case "password":
        case "confpassword":
        case "age":
        case "gender":
          formErrors[key] = formDetails[key].trim() ? "" : "Field cannot be empty";
          break;
        default:
          break;
      }
    });
    if (Object.values(formErrors).some((error) => error)) {
      setErrors(formErrors);
      return;
    }

    try {
      const formData = {
        userEmail: formDetails.userEmail,
        password: formDetails.password,
        first_name: formDetails.firstname,
        last_name: formDetails.lastname,
        account_type: 1,
        user_name: formDetails.userName,
        age: formDetails.age,
        gender: formDetails.gender,
      };

      const response = await axios.post("http://localhost:5000/users/signup", formData);

      console.log("Registration successful", response.data);

      setFormDetails({
        firstname: "",
        lastname: "",
        userEmail: "",
        password: "",
        confpassword: "",
        userName: "",
        age: "",
        gender: "",
      });
      setErrors({
        firstname: "",
        lastname: "",
        userEmail: "",
        password: "",
        confpassword: "",
        userName: "",
        age: "",
        gender: "",
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
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
        <h2 className="form-heading">Sign Up</h2>
        <form onSubmit={formSubmit} className="register-form">
          {fields.map((field, index) => (
            <div key={index} className="input-container">
              <input
                type={field === "password" || field === "confpassword" ? "password" : "text"}
                name={field}
                className="form-input"
                placeholder={`Enter your ${field}`}
                value={formDetails[field]}
                onChange={inputChange}
              />
              <button
                type="button"
                className="btn voice-btn"
                onClick={handleVoiceInput}
              >
                Voice
              </button>
              {errors[field] && <span className="error">{errors[field]}</span>}
            </div>
          ))}
          <button type="submit" className="btn form-btn">
            Sign up
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink className="login-link" to={"/login"}>
            Log in
          </NavLink>
          <p></p>
          <p></p>
        </p>
      </div>
    </section>
  );
}

export default Register;
