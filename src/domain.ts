export interface Location {
  name: string,
  id: string
}

export interface Trip {
  startTime: string,
  endTime: string,
  duration: string // in ISO-8601 format
}