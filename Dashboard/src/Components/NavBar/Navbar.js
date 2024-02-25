import React from 'react';
import './navbarstyles.css';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <ul className="navbar-nav">
            <li><a href="/"><p>Home</p></a></li>
            <li><a href="/Login"><p>login</p></a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;