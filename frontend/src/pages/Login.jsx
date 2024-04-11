import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/register.css";
import toast from "react-hot-toast";
import { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

function Login() {
  const [formDetails, setFormDetails] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  const { transcript, resetTranscript } = useSpeechRecognition();
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const fields = ["username", "password"];
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

  const formSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formDetails;
    if (!username || !password) {
      return setErrorMessage("Input fields should not be empty");
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/users/login',
        JSON.stringify({ user_name: username, password: password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response?.data);
      window.location.href = "/"; // Redirect to home page
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password"); // Set error message
      } else {
        setErrorMessage("Failed to sign in. Please check your credentials.");
      }
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Sign In</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Render error message if present */}
        <form onSubmit={formSubmit} className="register-form">
          {fields.map((field, index) => (
            <div key={index} className="input-container">
              <input
                type="text"
                name={field}
                className="form-input"
                placeholder={`Enter your ${field}`}
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
            </div>
          ))}
          
          <button type="submit" className="btn form-btn">
            Sign in
          </button>
        </form>
        <p>
          Not a user?{" "}
          <NavLink
            className="login-link"
            to={"/register"}
          >
            Register
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Login;
