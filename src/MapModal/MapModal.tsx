import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import './MapModal.scss';
import { useAppDispatch } from "../store/hooks";
import { actions as mapModalActions } from "../features/mapModal";
import { useState } from "react";
import L, { LeafletMouseEvent } from "leaflet";

export const MapModal = () => {
  const mapCenter: [number, number] = [49.0, 31.0];

  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);

  const handleMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setCoordinates([lat, lng]);
  };

  const markerIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + '/img/location-pin.svg',
    iconSize: [21, 30],
    iconAnchor: [10, 15],
  });

  const dispatch = useAppDispatch();


  return (
    <div className="modal">
      <header className="header">
        <button
          type="button"
          className="button-close"
          onClick={() => {
            dispatch(mapModalActions.changeState(false));
          }}
        >
          <FontAwesomeIcon icon={faXmark} size="lg" style={{ color: "rgb(40, 40, 40)" }} />
        </button>
      </header>

      <main>
        <p className="location">

        </p>

        <MapContainer
          center={mapCenter}
          zoom={5.5}
          style={{ height: '400px', width: '100%', zIndex: '2' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {coordinates && (
            <Marker position={coordinates} icon={markerIcon}>
            </Marker>
          )}

        </MapContainer>

        <button
          type="button"
          className="submit-button"
          onClick={() => { }}
        >
          Підтвердити вибір
        </button>
      </main>
    </div>
  );
}