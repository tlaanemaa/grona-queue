import React, { useState, useCallback, useEffect } from "react";
import styles from "./styles.module.css";
import { QueueApi } from "../../api/QueueApi";
import { Ride } from "../../model/Ride";
import RideContainer from "../RideContainer";

const api = new QueueApi();

const QueueContainer = () => {
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
    <div className={styles.base}>
      {!rides
        ? "Loading..."
        : rides.map((ride) => {
            return <RideContainer key={ride.id} ride={ride}></RideContainer>;
          })}
      <button onClick={updateRides} className={styles.button}>
        Refresh
      </button>
    </div>
  );
};

export default QueueContainer;
