import React, { useState } from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register }  from '../../features/userSlice';
import Spinner from "../../Components/Spinner";
import { redirect } from "react-router-dom";

function SignupPage() {
  const {userdata, isLoading, isError, message } = useSelector(
    (state) => state.userdata
  );
  
  let dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(userdata){
      redirect('/');
    }
    
    if (isLoading) {
      <Spinner />;
    }

    if (isError) {
      console.log(message);
    }
  });


  const handleSignup = async(e) => {
    e.preventDefault();
    dispatch(register({ 
      Username: username,
      Password: password,
      email: email
    }));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Signup</h2>
              <form onSubmit={handleSignup}>
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
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
              <p>Already have an account?<a href='/Login'>Sign in</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;