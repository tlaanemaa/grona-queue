import React, { useState, useEffect } from "react";
import "./App.css";
import { QueueApi } from "./api/QueueApi";
import RideContainer from "./components/RideContainer";
import { Ride } from "./model/Ride";

function App() {
  const [rides, setRides] = useState<Ride[]>();

  useEffect(() => {
    const api = new QueueApi();
    const callback = async () => setRides(await api.getLatest());
    const interval = setInterval(callback, 600000);
    callback();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grona-queue-app">
      {rides?.map((ride) => {
        return <RideContainer key={ride.id} ride={ride}></RideContainer>;
      })}
    </div>
  );
}

export default App;
