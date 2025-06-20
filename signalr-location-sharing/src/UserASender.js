import { useState } from "react";
import "./index.css";
import { useSignalRef } from './useSignalR';

const UserASender = () => {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [userName, setUserName] = useState("");

  const { sendLocation } = useSignalRef(() => {});

  const handleSend = () => {
    const parsedLat = parseFloat(lat);
    const parsedLon = parseFloat(lon);
    if (!userName || isNaN(parsedLat) || isNaN(parsedLon)) {
      alert("Please enter a valid email and coordinates");
      return;
    }
    sendLocation(parsedLat, parsedLon, userName);
  };

  return (
    <div className="card">
      <h2>📤 Send Location</h2>
      <input
        type="text"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleSend}>Send 📡</button>
    </div>
  );
};

export default UserASender;
