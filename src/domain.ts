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

export type Leg = WalkLeg | OtherLeg;

export enum LegKind {
  WALK = "Walk",
  BUS = "Bus",
  METRO = "Metro",
  SHIP = "Ship"
}

export interface WalkLeg {
  kind: LegKind.WALK,
  distance: number
}

export interface OtherLeg {
  kind: LegKind.METRO | LegKind.BUS | LegKind.SHIP,
  line: number,
  name: string
}

// TODO: Find a better name for this
export interface Trip {
  startTime: DateTime,
  endTime: DateTime,
  duration: Duration
}