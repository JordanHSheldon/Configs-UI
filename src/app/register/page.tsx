"use client";

import { setCookie } from "cookies-next";
import { useState } from 'react';
import { cred } from '../lib/definitions';
import { useRouter } from 'next/navigation';
import Toast from "react-hot-toast";
import "./register.css"

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let cred = (await RegisterUser(username, password, email)).result;
    if (cred == "Error creating user data"){
      Toast.error("User already exists!");
      return;
    }

    setCookie("user", cred, { maxAge: 60 * 6 * 24 });
    Toast.success("Welcome!");
    router.push("/profile");
    return;
  };

  return (
    <div className="login-container">
    <h2>Create your account</h2>
    <form action="submit" onSubmit={handleSubmit}>
        <div className="input-field">
            <label htmlFor="email">Enter your email</label>
            <input type="email" id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}  required></input>
        </div>
        <div className="input-field">
            <label htmlFor="Username">Username</label>
            <input type="text" id="username" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}  required></input>
        </div>
        <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required></input>
        </div>
        <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" required></input>
        </div>
        <button type="submit" className="create-account-btn" >Create Account</button>
    </form>
    <div className="sign-in-link">
        Already have an account? <a href="/login">Sign in</a>
    </div>
</div>
  );
};

async function RegisterUser(username: string, password: string, email: string): Promise<cred> {
  let request = { 
    Username: username,
    Password: password,
    Email: email
  };

  const response = await fetch(process.env.url+'/User/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  return response.json();
}
