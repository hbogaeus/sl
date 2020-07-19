import { Trip, Location, LocationKind } from "../domain";
import { DateTime, Duration } from "luxon";

const baseUrl = '/api';

const http = async <T>(request: RequestInfo): Promise<T> => {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

interface LocationsResponse {
  ResponseData: {
    Name: string,
    Type: LocationKind,
    SiteId: string,
    X: string,
    Y: string
  }[]
}

const formatCoordinates = (x: string, y: string): { long: string, lat: string } => ({
  long: x.substring(0, 2) + "." + x.substring(2),
  lat: y.substring(0, 2) + "." + y.substring(2),
})

export const getLocations = async (input: string): Promise<Location[]> => {
  const url = `${baseUrl}/typeahead.json?searchstring=${encodeURIComponent(input)}&stationsonly=false&maxresults=5`
  const response = await http<LocationsResponse>(url);

  return response.ResponseData.map(location => {
    if (location.Type == LocationKind.Station) {
      return {
        kind: LocationKind.Station,
        name: location.Name,
        id: location.SiteId
      }
    } else if (location.Type == LocationKind.Address) {
      return {
        kind: LocationKind.Address,
        name: location.Name,
        coords: formatCoordinates(location.X, location.Y)
      }
    }
  })
}

interface TripPlanResponse {
  Trip: {
    LegList: {
      Leg: {
        Origin: {
          name: string,
          time: string
        },
        Destination: {
          name: string,
          time: string
        },
        JourneyDetailRef: {
          ref: string
        },
      }[]
    },
    duration: string // in ISO-8601 format
  }[]
}

const mapResponseToDomain = (response: TripPlanResponse): Trip[] => {
  return response.Trip.map(trip => {
    const startTime = DateTime.fromISO(trip.LegList.Leg[0].Origin.time);
    const endTime = DateTime.fromISO(trip.LegList.Leg[0].Destination.time);
    return {
      startTime: startTime,
      endTime: endTime,
      duration: Duration.fromISO(trip.duration)
    }
  });
}

// TODO: Rewrite in a functional style
const appendParameters = (location: Location, params: URLSearchParams, paramPrefix: 'origin' | 'dest'): void => {
  if (location.kind == LocationKind.Station) {
    params.append(`${paramPrefix}Id`, location.id);
  } else if (location.kind == LocationKind.Address) {
    params.append(`${paramPrefix}CoordLat`, location.coords.lat);
    params.append(`${paramPrefix}CoordLong`, location.coords.long);
  } else {
    console.warn('Unhandled location kind', location);
  }
}

export const getTripPlan = async (origin: Location, destination: Location): Promise<Trip[]> => {
  let apiUrl = `${baseUrl}/TravelplannerV3_1/trip.json`;
  let params = new URLSearchParams();

  appendParameters(origin, params, 'origin');
  appendParameters(destination, params, 'dest');

  const url = `${apiUrl}?${params.toString()}`
  console.log(url);
  const response = await http<TripPlanResponse>(url);

  return mapResponseToDomain(response);
}