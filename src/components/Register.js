import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);
    if (res.success) navigate("/login");
    else alert(res.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="employeeId" placeholder="Employee ID" onChange={handleChange} /><br/>
      <input name="firstName" placeholder="First Name" onChange={handleChange} /><br/>
      <input name="lastName" placeholder="Last Name" onChange={handleChange} /><br/>
      <input name="email" placeholder="Email" onChange={handleChange} /><br/>
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br/>
      <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br/>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
