import { useEffect, useState } from 'react';
import Toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./register.css"
import { cred } from '../../lib/definitions';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies?.user) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cred = (await RegisterUser(username, password, email)).result;
    
    if (cred === "Error creating user data" || cred === "User already exists") {
      Toast.error("User already exists!");
      return;
    }

    setCookie("user", cred, { maxAge: 60 * 6 * 24 });
    Toast.success("Welcome!");
    navigate("/");
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
  const request = { 
    Username: username,
    Password: password,
    Email: email
  };

  const response = await fetch('https://localhost:7191/api/User/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  return response.json();
}
