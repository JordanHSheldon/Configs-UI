'use client'

import store from '../store';
import "./navBar.css"

const SideNav = () => {
  const { IsUserLoggedIn } = store.getState(); 

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href='/'><h1>configs</h1></a>
        <a href='/perihperals'><p>Peripherals</p></a>
        <a href='/players'><p>Players</p></a>
      </div>
      <div className="navbar-right">
          { IsUserLoggedIn ?
            <>
              <a href='/profile'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s" alt="Logo"></img></a>
              <a href='/logout'><img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/logout-2651139-2198213.png?f=webp&w=256" alt="Logo"></img></a> 
            </>
          :
            <a href="/login" className="login-btn">Login / Signup</a>
          }
      </div>
    </nav>
  );
};

export default SideNav;


