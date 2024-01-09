import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { GeoJsonObject } from 'geojson';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actions as regionsActions } from '../features/regions';

type Point = {
  name: string;
  coordinates: [number, number];
}

type Props = {
  points: Point[];
}

export const Map: React.FC<Props> = ({ points }) => {
  const [boarder, setBoarder] = useState<GeoJsonObject | null>(null);
  const [regions, setRegions] = useState<GeoJsonObject | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const selectedRegions = useAppSelector(state => state.regions);

  const mapCenter: [number, number] = [49.0, 31.0];

  const markerIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + '/img/location-pin.svg',
    iconSize: [21, 30],
    iconAnchor: [10, 15],
  });

  const getRegionColor = (regionName: string) => {
    let regionColor: string | undefined = 'rgba(0, 0, 0, 0.3)';

    const regionIndex = selectedRegions.findIndex(item => item === regionName);

    if (regionIndex !== -1) {
      regionColor = 'rgba(255, 255, 255, 0.6)';
    } else if (regionName === hoveredRegion) {
      regionColor = 'rgb(0, 0, 0)';
    }

    return regionColor;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const borderResponse = await fetch('/PinsAndPosts/geo/ukraine.geojson');
        const regionsResponse = await fetch('/PinsAndPosts/geo/regions.geojson');

        const borderData = await borderResponse.json();
        const regionsData = await regionsResponse.json();

        setBoarder(borderData);
        setRegions(regionsData);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };

    fetchData();
  }, [])

  console.log(regions);

  const handleRegionClick = (regionName: string) => {
    dispatch(regionsActions.addRegion(regionName));

    console.log(dispatch);
  };

  console.log(selectedRegions);

  return (
    <MapContainer
      center={mapCenter}
      zoom={5.5}
      style={{ height: '100vh', width: '60%', zIndex: '1' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {points.map((point, index) => (
        <Marker
          key={index}
          position={point.coordinates}
          icon={markerIcon}
        >
          <Popup>{point.name}</Popup>
        </Marker>
      ))}

      {boarder && (
        <GeoJSON
          data={boarder}
          style={{
            color: 'rgb(148,151,145)',
            fillColor: 'rgba(0, 0, 0, 0.3)',
            fillOpacity: 0.3,
            weight: 2,
          }}
        />
      )}

      {regions && (
        <GeoJSON
          data={regions}
          style={(feature) => ({
            color: 'rgb(172,164,164)',
            fillColor: getRegionColor(feature?.properties.name),
            fillOpacity: 0.3,
            weight: 1,
          })}
          onEachFeature={(feature, layer) => {
            layer.on({
              mouseover: () => setHoveredRegion(feature.properties.name),
              mouseout: () => setHoveredRegion(null),
              // click: () => handleRegionClick(feature.properties.),
              // click: () => handleRegionClick({ feature.properties.name, feature.properties.id }),
              click: () => handleRegionClick(feature.properties.name),
            })
          }}
        />
      )}

    </MapContainer>
  );
};
