import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/authSlice";
import Spinner from "../Components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    alias: "",
    password: "",
  });

  const { alias, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error("An unexpected error has occured");
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const userData = {
      alias,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <ToastContainer />
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login</p>
      </section>
      <section>
        <form onSubmit={handleOnSubmit}>
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
            <input type="submit" className="form-control" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
