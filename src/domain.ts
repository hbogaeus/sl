import { DateTime, Duration } from "luxon";

export type Location = Station | Address;

export enum LocationKind {
  Station = "Station",
  Address = "Address"
}

export interface Station {
  kind: LocationKind.Station,
  name: string,
  id: string
}

export interface Address {
  kind: LocationKind.Address,
  name: string,
  coords: {
    long: string,
    lat: string
  }
}

export interface SavedTrip {
  from: Location,
  to: Location
}

// TODO: Find a better name for this
export interface Trip {
  startTime: DateTime,
  endTime: DateTime,
  duration: Duration
}