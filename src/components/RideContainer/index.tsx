import React from "react";
import styles from "./styles.module.css";
import { Ride } from "../../model/Ride";

type Props = {
  ride: Ride;
};

const RideContainer = ({ ride }: Props) => {
  const backgroundImg = {
    backgroundImage: `url(${ride.metadata.imageInList.file.url})`,
  };
  return (
    <div className={styles.base} style={backgroundImg}>
      {ride.metadata.title}
    </div>
  );
};

export default RideContainer;
