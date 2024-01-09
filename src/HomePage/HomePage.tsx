import { AdvertisementList } from "../AdvertisementList";
import { LeftSideBar } from "../LeftSideBar/LeftSideBar";
import { Map } from "../Map";
import './HomePage.scss';
import { Modal } from "../Modal/Modal";
import { useAppSelector } from "../store/hooks";
import { MapModal } from "../MapModal/MapModal";

type Point = {
  name: string;
  coordinates: [number, number];
}

export const HomePage = () => {
  const advertisements = useAppSelector(state => state.advertisements);
  const isModalShown = useAppSelector(state => state.modal);
  const isMapModalShown = useAppSelector(state => state.mapModal);

  const points: Point[] = [
    { name: 'Point 1', coordinates: [49.0, 31.0] },
    { name: 'Point 2', coordinates: [50.0, 24.0] },
    { name: 'Point 2', coordinates: [50.5, 30.5] },
  ];

  return (
    <div className="page">
      <LeftSideBar />

      <Map points={points} />

      <AdvertisementList advertisements={advertisements} />

      {isModalShown && <Modal />}

      {isMapModalShown && <MapModal />}
    </div>
  );
}
