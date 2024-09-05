import React from 'react';
import './peripherals.css';
import { Peripheral } from '../lib/definitions';

const PeripheralCard: React.FC<Peripheral> = ({name, url}) => {
  return (
    <div className={"detailsContainer"}>
      <h2 className={"name"}><a href={url}>{name}</a></h2>
    </div>
  );
};

export default PeripheralCard;