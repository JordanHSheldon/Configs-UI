import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../store';
import "./login.css"

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies] = useCookies(['user']);
  const navigate = useNavigate();
  const { login } = useUserStore();
  

  useEffect(() => {
    if (cookies.user) {
      navigate("/");

  console.log(import.meta.env);
    }
  }, [cookies, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username,password);
  };

  return (
    <div>
      <div className="login-container">
        <form action="submit" onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="confirm-password">Username</label>
            <input type="text" id="username" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} required></input>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required></input>
          </div>
            <button type="submit" className="create-account-btn">Sign In</button>
        </form>
        <div className="sign-in-link">
            Don't have an account? <a href="/register">sign up</a>
        </div>

      </div>
      <div className='ExternalAuth'>
        <div className="discord-login">
          <img src="https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ=w240-h480-rw" alt="Discord Logo" width="50" height="50" onClick={()=>DiscordLogin()} />
        </div>
        <div className="steam-login">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvuKJiVA1-WtJ81X8FDVFIsBQXGWzzxqzuA&s" alt="Steam Logo" width="50" height="50" onClick={()=>DiscordLogin()} />
        </div>
        <div className="google-login">
          <img src="https://images.icon-icons.com/2699/PNG/512/google_logo_icon_169090.png" alt="Google Logo" width="50" height="50" onClick={()=>DiscordLogin()} />
        </div>
      </div>
    </div>
  );

  function DiscordLogin() {
    window.open(import.meta.env.VITE_API_URL+"api/User/DiscordLogin", "_self");
  }
};