import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
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

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Sign Up</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="text"
            name="firstname"
            className="form-input"
            placeholder="Enter your first name"
            value={formDetails.firstname}
            onChange={inputChange}
          />
          <input
            type="text"
            name="lastname"
            className="form-input"
            placeholder="Enter your last name"
            value={formDetails.lastname}
            onChange={inputChange}
          />
          <input
            type="userEmail"
            name="userEmail"
            className="form-input"
            placeholder="Enter your userEmail"
            value={formDetails.userEmail}
            onChange={inputChange}
          />
           <input
            type="text"
            name="userName"
            className="form-input"
            placeholder="Enter your userName"
            value={formDetails.userName}
            onChange={inputChange}
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
          />
          {/* New input fields */}
          <input
            type="number"
            name="age"
            className="form-input"
            placeholder="Enter your age"
            value={formDetails.age}
            onChange={inputChange}
          />
          <input
            type="text"
            name="gender"
            className="form-input"
            placeholder="Enter your gender"
            value={formDetails.gender}
            onChange={inputChange}
          />
          <button
            type="submit"
            className="btn form-btn"
            disabled={loading ? true : false}
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