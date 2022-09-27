import React from "react";
import styles from "./styles.module.css";
import { Ride } from "../../model/Ride";

type Props = {
  ride: Ride;
  currentTimeMs: number;
};

const RideContainer = ({ ride, currentTimeMs }: Props) => {
  const backgroundImg = {
    backgroundImage: `url(${ride.metadata.imageInList.file.url})`,
  };

  const minutesTillLastUpdate = Math.round(
    (currentTimeMs - ride.lastUpdated.getTime()) / (1000 * 60)
  );

  const currentWaitText = `Current wait time ${ride.queueText} min`;
  const lastUpdatedText =
    minutesTillLastUpdate === 0
      ? "Last updated now"
      : minutesTillLastUpdate === 1
      ? `Last updated ${minutesTillLastUpdate} minute ago at ${ride.lastUpdated.toLocaleTimeString()}`
      : `Last updated ${minutesTillLastUpdate} minutes ago at ${ride.lastUpdated.toLocaleTimeString()}`;

  return (
    <div className={styles.base} style={backgroundImg}>
      <div className={styles.overlay}>
        <div className={styles.title}>{ride.metadata.title}</div>
        <div className={styles.queueTime}>{currentWaitText}</div>
        <div className={styles.lastUpdated}>{lastUpdatedText}</div>
      </div>
    </div>
  );
};

export default RideContainer;
