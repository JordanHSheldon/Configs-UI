import React from 'react';
import './styles.css';
import { Peripheral } from '../lib/definitions';

const PlayerCard: React.FC<Peripheral> = ({ name,type,url}) => {
  return (
    <div className={"detailsContainer"}>
      <h2 className={"name"}><a href={url}>{name}</a></h2>
    </div>
  );
};

export default PlayerCard;