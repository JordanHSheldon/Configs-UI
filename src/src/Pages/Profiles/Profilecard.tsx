import React from 'react';
import './players.css';
import { Profile } from '../../lib/definitions';

const ProfileCard: React.FC<Profile> = ({username, avatar}) => {
  return (
    <div className="player-card">
      <div className="imageContainer">
        <img src={avatar} alt={`${username}'s profile picture`} className={"profileImage"} />
      </div>
      <h2 className={"name"}><a href={"/u/"+username}>{username}</a></h2>
    </div>
  );
};

export default ProfileCard;