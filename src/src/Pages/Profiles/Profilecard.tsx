import React, { useEffect } from 'react';
import { Profile } from '../../lib/definitions';
import './players.css';
import { useNavigate } from 'react-router-dom';

const ProfileCard: React.FC<Profile> = ({id,userName, avatar}) => {
  const navigate = useNavigate();

useEffect(() => {
}, [navigate]);

  return (
    <div id={`player-card-${id}`} className="player-card" onClick={()=> navigate(import.meta.env.BASE_URL + "u/"+userName)}>
      <div className="imageContainer">
        <img src={avatar} alt={`${userName}'s profile picture`} className={"profileImage"} />
      </div>
      <h2 className={"name"}>{userName}</h2>
    </div>
  );
};

export default ProfileCard;