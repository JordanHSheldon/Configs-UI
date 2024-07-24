'use client'

import { useCookies } from 'next-client-cookies';
import "./navBar.css"

const SideNav = () => {
  const cookieStore = useCookies();
  const user = cookieStore.get('user');

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="logo.png" alt="Logo"></img>
      </div>
      <div className="navbar-right">
        <form className="search-form">
          <input type="text" placeholder="Search..."></input>
        </form>
        {user ? <a href="/login" className="login-btn">Login / Signup</a> :
          <div className="navbar-right">
            <img src="logo.png" alt="Logo"></img>
        </div>
        }
      </div>
    </nav>
  );
};

export default SideNav;