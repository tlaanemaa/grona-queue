import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { QueueApi } from "./api/QueueApi";
import RideContainer from "./components/RideContainer";
import { Ride } from "./model/Ride";

const api = new QueueApi();

function App() {
  const [rides, setRides] = useState<Ride[]>();

  const updateRides = useCallback(
    async () => setRides(await api.getLatest()),
    []
  );

  useEffect(() => {
    const interval = setInterval(updateRides, 600000);
    updateRides();
    return () => clearInterval(interval);
  }, [updateRides]);

  return (
    <div className="grona-queue-app">
      {!rides
        ? "Loading..."
        : rides.map((ride) => {
            return <RideContainer key={ride.id} ride={ride}></RideContainer>;
          })}
      <button onClick={updateRides}>Refresh</button>
    </div>
  );
}

export default App;
