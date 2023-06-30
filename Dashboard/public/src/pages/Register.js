import React from "react";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/authSlice";
import Spinner from "../Components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    alias: "",
    email: "",
    password: "",
    password2: "",
  });

  
  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    if (password !== password2) {
      toast.error("passwords do not match");
    } else {
      const userData = {
        lname,
        fname,
        alias,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  const { lname, fname, alias, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(()=>{
    if(isError){
        toast.error(message)
    }

    if(isSuccess || user){
        navigate('/');
    }
    
    dispatch(reset())
  },[user,isError,isSuccess,message,navigate,dispatch])

  if(isLoading){
    return <Spinner />
  }

  return (
    <div>
      <form>
      <ToastContainer />
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section>
        <div className="form-group">
          
            <input
              type="text"
              className="form-control"
              id="fname"
              name="fname"
              value={fname}
              placeholder="enter your first name"
              onChange={handleOnChange}
            />
        </div>
        <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="lname"
              name="lname"
              value={lname}
              placeholder="enter your last name"
              onChange={handleOnChange}
            />
        </div>
        <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="alias"
              name="alias"
              value={alias}
              placeholder="enter your alias"
              onChange={handleOnChange}
            />
        </div>
        <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="enter your email"
              onChange={handleOnChange}
            />
        </div>
        <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="enter your password"
              onChange={handleOnChange}
            />
        </div>
        <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="confirm your password"
              onChange={handleOnChange}
            />
        </div>
        <div className="form-group">
          <form onSubmit={()=>onSubmit()}>
            <input type="submit" className="form-control" />
          </form>
        </div>
      </section>
      </form>
    </div>
  );
};

export default Register;
