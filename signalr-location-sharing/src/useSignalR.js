import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export const useSignalRef = (onLocationReceived) => {
  const connectionRef = useRef(null);

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl("https://tech-test.raintor.com/Hub")
      .build();

    connectionRef.current = connect;

    connect
      .start()
      .then(() => {
        console.log("SignalR connected");
        connect.on("ReceiveLatLon", (data) => {
          onLocationReceived(data);
        });
      })
      .catch((err) => {
        console.error("SignalR connection error:", err);
      });

    return () => {
      connect.stop();
    };
  }, [onLocationReceived]);

  const sendLocation = (lat, lon, userName) => {
    if (connectionRef.current) {
      connectionRef.current
        .invoke("SendLatLon", lat, lon, userName)
        .catch((err) => console.error("Send failed:", err));
    }
  };

  return { sendLocation };
};
