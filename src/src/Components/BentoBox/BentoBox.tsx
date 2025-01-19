import React from 'react'
import './bentoBox.css';

const BentoBox = () => {
  return (
    <div className="bento-container">
      <div className="big-box">
        <h1>Save your game configs and settings.  </h1>
        <h2>Never lose your video game data, and we'll help you improve.</h2>
      </div>
      <div className="bento-button">
        <button>Sign up now</button>
      </div>
      <div className="small-box-container">
        <div className="small-box">Test</div>
        <div className="small-box">Total players</div>
      </div>
  </div>
  )
}

export default BentoBox;