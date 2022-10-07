import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Ride } from "../../model/Ride";

type Props = {
  ride: Ride;
};

const calculateMinutesDifference = (timeNow: number, targetTime: number) => {
  return Math.round((timeNow - targetTime) / (1000 * 60));
};

const RideContainer = ({ ride }: Props) => {
  const [minutesSinceUpdate, setMinutesSinceUpdate] = useState<number>(
    calculateMinutesDifference(Date.now(), ride.lastUpdated.getTime())
  );

  // Update time every 20 seconds
  // This rerenders the "x minutes ago" bits
  useEffect(() => {
    const interval = setInterval(
      () =>
        setMinutesSinceUpdate(
          calculateMinutesDifference(Date.now(), ride.lastUpdated.getTime())
        ),
      20000
    );
    return () => clearInterval(interval);
  }, [ride.lastUpdated]);

  const backgroundImg = {
    backgroundImage: `url(${ride.metadata.imageInList.file.url})`,
  };

  const currentWaitText = `Current wait time ${ride.queueText} min`;
  const lastUpdatedText =
    minutesSinceUpdate === 0
      ? "Last updated now"
      : minutesSinceUpdate === 1
      ? `Last updated ${minutesSinceUpdate} minute ago at ${ride.lastUpdated.toLocaleTimeString()}`
      : `Last updated ${minutesSinceUpdate} minutes ago at ${ride.lastUpdated.toLocaleTimeString()}`;

  const rideLink = `https://www.gronalund.com/${ride.metadata.pageLink.slug}`;

  return (
    <a
      className={styles.base}
      style={backgroundImg}
      href={rideLink}
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles.overlay}>
        <div className={styles.title}>{ride.metadata.title}</div>
        <div className={styles.queueTime}>{currentWaitText}</div>
        <div className={styles.lastUpdated}>{lastUpdatedText}</div>
      </div>
    </a>
  );
};

export default RideContainer;
