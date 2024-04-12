import React, { useState } from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login }  from '../../features/userSlice';
import Spinner from "../../Components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

function LoginPage() {
  const {isLoading, isError, message } = useSelector(
    (state) => state.userdata
  );
  
  const Navigate = useNavigate();
  const cookies = new Cookies();
  const notify = (msg) =>{
    toast(msg);
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if(cookies.get("user")){
      Navigate("/");
    }
  
    if (isLoading) {
      <Spinner />;
    }

    if (isError) {
      notify(message);
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(await login({ 
        Username: username,
        Password: password
      }));
    } catch (error) {
      // toast.error('Login failed. Please try again.');
    }

  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <p>Don't have an account?<a href='register'>Sign up</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;