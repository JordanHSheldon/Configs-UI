'use client'

import store from '../store';
import "./navBar.css"

const SideNav = () => {
  const { IsUserLoggedIn } = store.getState(); 

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href='/'><h1 className=''>configs</h1></a>
        <a href='/perihperals'><p className=''>Peripherals</p></a>
        <a href='/players'><p className=''>Players</p></a>
      </div>
      <div className="navbar-right">
        {IsUserLoggedIn ? 
        <>
          <div className="navbar-right">
            <a href='/profile'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s" alt="Logo"></img></a>
          </div>
          <div className="navbar-right">
          <a href='/logout'><img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/logout-2651139-2198213.png?f=webp&w=256" alt="Logo"></img></a>
        </div>
        </> 
          : 
          <a href="/login" className="login-btn">Login / Signup</a>
        }
      </div>
    </nav>
  );
};

export default SideNav;


