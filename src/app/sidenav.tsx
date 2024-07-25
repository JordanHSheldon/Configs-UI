'use client'

import { useCookies } from 'next-client-cookies';
import "./navBar.css"

const SideNav = () => {
  const cookieStore = useCookies();
  const user = cookieStore.get('user');

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href='/'><img src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-house-icon-png-image_4013530.jpg" alt="Logo"></img></a>
      </div>
      <div className="navbar-right">
        <form className="search-form">
          <input type="text" placeholder="Search..."></input>
        </form>
        {user ? 
          <div className="navbar-right">
            <a href='/profile'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s" alt="Logo"></img></a>
          </div>
          : 
          <a href="/login" className="login-btn">Login / Signup</a>
        }
      </div>
    </nav>
  );
};

export default SideNav;