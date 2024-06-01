import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "./icon.svg";

// Define a default position in case geolocation is not available or not permitted
// const DEFAULT_POSITION = [29.854263, 77.888]; // Example: London's latitude and longitude

const LocationSelector = ({
  onLocationSelected,
  DEFAULT_POSITION,
  styles,
}) => {
  const [position, setPosition] = useState(DEFAULT_POSITION);


  const MapEvents = () => {

    // useEffect(() => {
    //   if (position) {
    //     map.flyTo(position, map.getZoom());
    //   }
    // }, [position, map]);

    // useMapEvents({
    //   click(e) {
    //     const newSelectedPosition = {
    //       lat: e.latlng.lat,
    //       lng: e.latlng.lng,
    //     };
    //     setPosition(newSelectedPosition); // Update position based on map click
    //     onLocationSelected(newSelectedPosition); // Optionally, send new position to backend or parent component
    //   },
    // });

    return position ? (
      <Marker
        position={position}
        icon={
          new L.Icon({
            iconUrl: icon,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })
        }
      />
    ) : null;
  };

  return (
    <MapContainer
      center={position || DEFAULT_POSITION}
      zoom={13}
      className={styles}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
    </MapContainer>
  );
};

export default LocationSelector;
