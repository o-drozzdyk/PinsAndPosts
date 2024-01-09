import React from 'react';
import './Advertisement.scss';
import { Advertisement as AdvertisementItem } from '../types/Advertisement';

type Props = {
  advertisement: AdvertisementItem;
}

export const Advertisement: React.FC<Props> = ({ advertisement }) => {
  const {
    title,
    photo,
    city,
    price,
  } = advertisement;

  return (
    <article className='card'>
      <img
        src={photo}
        alt="service"
        className="card__photo"
      />

      <h3 className="card__title">{title}</h3>

      <div className="card__price">
        <p className="card__price-text">Мінімальна вартість:</p>

        <p className="card__price-number">{price} грн</p>
      </div>

      <div className="card__location">
        <img
          src="/img/location-pin.svg"
          alt="location"
          className="card__location-icon"
        />

        <p className="card__location-city">{city}</p>
      </div>
    </article>
  );
};
