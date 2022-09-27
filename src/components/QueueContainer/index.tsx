import React, { useState, useCallback, useEffect } from "react";
import styles from "./styles.module.css";
import { QueueApi } from "../../api/QueueApi";
import { Ride } from "../../model/Ride";
import RideContainer from "../RideContainer";

const api = new QueueApi();

const QueueContainer = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [timeMs, setTimeMs] = useState<number>(Date.now());

  const updateRides = useCallback(
    async () => setRides(await api.getLatest()),
    []
  );

  // Update rides every 10 min
  useEffect(() => {
    const interval = setInterval(updateRides, 600000);
    updateRides();
    return () => clearInterval(interval);
  }, [updateRides]);

  // Update time every 15 seconds
  // This rerenders the "x minutes ago" bits
  useEffect(() => {
    const interval = setInterval(() => setTimeMs(Date.now()), 15000);
    return () => clearInterval(interval);
  }, [updateRides]);

  return (
    <div className={styles.base}>
      {!rides.length
        ? "Loading..."
        : rides.map((ride) => {
            return (
              <RideContainer
                key={ride.id}
                ride={ride}
                currentTimeMs={timeMs}
              ></RideContainer>
            );
          })}
      <button onClick={updateRides} className={styles.button}>
        Refresh
      </button>
    </div>
  );
};

export default QueueContainer;
