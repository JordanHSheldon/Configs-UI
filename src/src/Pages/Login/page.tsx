import { useEffect, useState } from 'react';
// import Toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./login.css"
import { useUserStore } from '../../store';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies] = useCookies(['user']);
  const navigate = useNavigate();
  const { login } = useUserStore();
  
  useEffect(() => {
    if (cookies.user) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username,password);
  };

  return (
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
          <button type="submit" className="create-account-btn">sign in</button>
      </form>
      <div className="sign-in-link">
          Don't have an account? <a href="/register">sign up</a>
      </div>
    </div>
  );
};