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

export type Leg = WalkLeg | OtherLeg | UnknownLeg;

export enum LegKind {
  UNKNOWN = "Unknown",
  WALK = "Walk",
  METRO = "Metro",
  TRAM = "Tram",
  BUS = "Bus",
  SHIP = "Ship",
  TRAIN = "Train"
}

export interface WalkLeg {
  kind: LegKind.WALK,
  distance: number
}

// TODO: Find a better name for this
export interface OtherLeg {
  kind: LegKind.METRO | LegKind.TRAM | LegKind.BUS | LegKind.SHIP | LegKind.TRAIN,
  line: number,
  name: string,
  direction: string
}

export interface UnknownLeg {
  kind: LegKind.UNKNOWN
}

// TODO: Find a better name for this
export interface Trip {
  startTime: DateTime,
  endTime: DateTime,
  duration: Duration,
  legs: Leg[]
}