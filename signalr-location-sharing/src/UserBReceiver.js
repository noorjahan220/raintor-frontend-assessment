import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSignalRef } from './useSignalR';




delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const UserBReceiver = () => {
  const [location, setLocation] = useState(null);

  useSignalRef((data) => {
    setLocation({
      lat: data.lat,
      lon: data.lon,
      userName: data.userName,
    });
  });

  return (
    <div className="card">
      <h2>🛰️ Live Location Map</h2>
      {location ? (
        <MapContainer
          key={`${location.lat}-${location.lon}`}
          center={[location.lat, location.lon]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lon]}>
            <Popup>{location.userName}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>No location received yet.</p>
      )}
    </div>
  );
};

export default UserBReceiver;
