import React from 'react';
import './players.css';
import { User } from '../lib/definitions';

const PlayerCard: React.FC<User> = ({userName}) => {
  return (
    <div className="card">
      <div className="imageContainer">
        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s"} alt={`${userName}'s profile picture`} className={"profileImage"} />
      </div>
      <div className={"detailsContainer"}>
        <h2 className={"name"}><a href={"/u/"+userName}>{userName}</a></h2>
      </div>
    </div>
  );
};

export default PlayerCard;