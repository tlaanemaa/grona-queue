import React from "react";
import { Ride } from "../model/Ride";

type Props = {
  ride: Ride;
};

const RideContainer = ({ ride }: Props) => {
  return <div>{ride.metadata.title}</div>;
};

export default RideContainer;
