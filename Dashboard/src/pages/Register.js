import React, { useState } from "react";
import { register } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  username: "",
  password: "",
  cpassword: ""
};

export default function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault()
    if (e.password !== e.cpassword) {
      console.log("Passwords do not match");
    } 
    else {
      try {
        const token = dispatch(register(values)).unwrap();
        //await dispatch(verifyToken(token));
        navigate("/")
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
        <form onSubmit={onSubmit}>
          <label htmlFor="fname">First Name:</label>
          <input
            value={values.fname}
            onChange={handleInputChange}
            name="fname"
            label="fname"
            id="fname"
          />
          <label htmlFor="lname">Last Name:</label>
          <input
            value={values.lname}
            onChange={handleInputChange}
            name="lname"
            label="lname"
            id="lname"
          />
          <label htmlFor="username">Username:</label>
          <input
            value={values.username}
            onChange={handleInputChange}
            name="username"
            label="username"
            id="username"
          />
          <label htmlFor="email">Email:</label>
          <input
            value={values.email}
            onChange={handleInputChange}
            name="email"
            label="email"
            id="email"
          />
          <label htmlFor="password">Password:</label>
          <input
            value={values.password}
            onChange={handleInputChange}
            name="password"
            label="password"
            id="password"
          />
          <label htmlFor="cpassword">Confirm Password:</label>
          <input
            value={values.cpassword}
            onChange={handleInputChange}
            name="cpassword"
            label="cpassword"
            id="cpassword"
          />
          <button type="submit"> Submit </button>
        </form>
  );
}