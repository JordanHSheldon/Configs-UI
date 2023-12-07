import React from 'react';
import './navbarstyles.css'; // Import the CSS file
import Cookies from "universal-cookie";

class Navbar extends React.Component {
  render() {
    const cookies = new Cookies();
    return (
      <nav className="navbar">
        <div className="container">
          <ul className="navbar-nav">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/Bot">Bot</a></li>
            <li><a href="/Login">login</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;