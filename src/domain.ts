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

export interface Trip {
  startTime: string,
  endTime: string,
  duration: string // in ISO-8601 format
}