import React from "react";
import { Advertisement as AdvertisementType } from "../types/Advertisement"
import { Advertisement } from "../Advertisement";
import './AdvertisementList.scss';

type Props = {
  advertisements: AdvertisementType[];
};

export const AdvertisementList: React.FC<Props> = ({ advertisements }) => {
  const listLength = advertisements.length.toString();

  return (
    <div className="section">
      <h2 className="section__info">
        {`Знайдено ${listLength} ${(+listLength !== 0 && +listLength < 5) || (+listLength > 20 && +listLength[listLength.length - 1] < 5)
          ? 'оголошення'
          : 'оголошень'
          } на видимій території`}
      </h2>

      <div className="section__cards">
        {advertisements.map(advertisement => (
          <Advertisement advertisement={advertisement} key={advertisement.id} />
        ))}
      </div>
    </div>
  );
};
