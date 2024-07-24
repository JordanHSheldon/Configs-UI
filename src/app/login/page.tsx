"use client";

import { setCookie } from "cookies-next";
import { useCookies } from 'next-client-cookies';
import { useEffect, useState } from 'react';
import { cred } from '../lib/definitions';
import { useRouter } from 'next/navigation';
import Toast from 'react-hot-toast'
import "./login.css"

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const cookieStore = useCookies();
  const router = useRouter();

  useEffect(() => {
    const user = cookieStore.get('user');
    if (user) {
      router.push("/profile");
    }
  }, [cookieStore, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let cred = (await Login(username, password)).result;
    
    if(cred == "Not found"){
      Toast.error("User not found");
      return;
    }

    setCookie("user", cred, { maxAge: 60 * 100 * 24 });
    Toast.success("Logged in succesfully");
    router.replace('/');
    return;
  };

  return (
    <div className="login-container">
    <h2>sign in to your account</h2>
    <form action="">
      <div className="input-field">
        <label htmlFor="confirm-password">Username</label>
        <input type="text" id="username" name="username" placeholder="username" required></input>
      </div>
      <div className="input-field">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" required></input>
      </div>
        <button type="submit" className="create-account-btn">Create Account</button>
    </form>
    <div className="sign-in-link">
        Don't have an account? <a href="/register">sign up</a>
    </div>
</div>
  );
};

async function Login(username: string, password: string): Promise<cred> {
  let request = { 
    Username: username,
    Password: password
  };

  const response = await fetch(process.env.url+'/User/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  return response.json();
}
