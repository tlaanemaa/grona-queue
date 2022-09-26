import rideMetadata from "../ride-metadata.json";

export class Ride {
  public readonly metadata = rideMetadata[this.id as keyof typeof rideMetadata];

  constructor(
    public readonly id: string,
    public readonly queueTime: number,
    public readonly queueText: string,
    public readonly info: string,
    public readonly lastUpdated: Date
  ) {}
}
