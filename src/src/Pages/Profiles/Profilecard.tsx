import React from 'react';
import './players.css';
import { Profile } from '../../lib/definitions';

const ProfileCard: React.FC<Profile> = ({userName, avatar}) => {
  return (
    <div className="player-card">
      <div className="imageContainer">
        <img src={avatar} alt={`${userName}'s profile picture`} className={"profileImage"} />
      </div>
      <div className={"detailsContainer"}>
        <h2 className={"name"}><a href={"/u/"+userName}>{userName}</a></h2>
      </div>
    </div>
  );
};

export default ProfileCard;