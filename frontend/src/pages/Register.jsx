import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useSpeechRecognition } from "react-speech-recognition"; // Import useSpeechRecognition
import "../styles/register.css";

function Register() {
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    userEmail: "",
    password: "",
    confpassword: "",
    userName: "", // Add userName field
    age: "", // Add age field
    gender: "", // Add gender field
  });
  const navigate = useNavigate();

  const { transcript, resetTranscript } = useSpeechRecognition();
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const fields = ["firstname", "lastname", "userEmail", "userName", "password", "age", "gender"];
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [isGenderEntered, setIsGenderEntered] = useState(false);
  const [spokenFields, setSpokenFields] = useState({});
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

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
      } else {
        setIsGenderEntered(true);
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

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async () => {
    setLoading(true); // Set loading state to true while making the API call

    try {
      // Define the data to send to the server
      const formData = {
        userEmail: formDetails.userEmail,
        password: formDetails.password,
        first_name: formDetails.firstname,
        last_name: formDetails.lastname,
        account_type: 1,
        user_name: formDetails.userName, // Include userName in the request
        age: formDetails.age, // Include age in the request
        gender: formDetails.gender, // Include gender in the request
      };

      // Make an Axios POST request to your API endpoint
      const response = await axios.post("http://localhost:5000/users/signup", formData);

      // Handle the response here (e.g., show a success message or redirect)
      console.log("Registration successful", response.data);

      // Reset the form and loading state
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
      setLoading(false);

      // Redirect the user to a success page or login page
      navigate("/login"); // You can change the route as needed
    } catch (error) {
      // Handle any errors (e.g., show an error message)
      console.error("Registration failed", error);

      // Reset the loading state
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentFieldIndex < fields.length && formDetails[fields[currentFieldIndex]] === "") {
      if (currentFieldIndex === 0) {
        speakInstructions("first name");
      } else {
        speakInstructions(fields[currentFieldIndex]);
      }
    }
  }, [currentFieldIndex, formDetails]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        // Start voice input when spacebar is pressed
        if (!allFieldsFilled) {
          handleVoiceInput();
        } else {
          event.preventDefault(); // Prevent default behavior of spacebar
          formSubmit();
        }
      } else if (event.code === "Enter") {
        // Submit the form when Enter is pressed
        event.preventDefault(); // Prevent default form submission
        formSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleVoiceInput, formSubmit, allFieldsFilled]);

  useEffect(() => {
    if (transcript.toLowerCase() === "confirm") {
      formSubmit();
    }
  }, [transcript]);

  useEffect(() => {
    // Check if all fields are filled
    const isAllFieldsFilled = Object.values(formDetails).every((value) => value !== "");
    setAllFieldsFilled(isAllFieldsFilled);
  }, [formDetails]);

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Sign Up</h2>
        <form onSubmit={(e) => e.preventDefault()} className="register-form">
          {fields.map((field, index) => (
            <div key={index} className="input-container">
              <input
                type="text"
                name={field}
                className="form-input"
                placeholder={`Enter your ${field}`}
                value={formDetails[field]}
                onChange={inputChange}
              />
              <button
                type="button"
                className="btn voice-btn"
                onClick={() => handleVoiceInput(field)}
              >
                Voice
              </button>
            </div>
          ))}
          
          <button
            type="submit"
            className="btn form-btn"
            disabled={loading || !isGenderEntered}
            onClick={formSubmit}
          >
            Sign up
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink className="login-link" to={"/login"}>
            Log in
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;
