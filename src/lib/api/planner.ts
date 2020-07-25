import { Trip, Location, LocationKind, Leg, LegKind } from "../../domain";
import { DateTime } from "luxon";
import map from 'lodash/map';

const baseUrl = '/api';

const http = async <T>(request: RequestInfo): Promise<T> => {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

interface ResponseLocation {
  name: string,
  time: string
  date: string,
  rtDate?: string,  // rtXXXX versions are the actual times, after delays and such
  rtTime?: string   // they are only present if there are delays
}

type ResponseLegType = "WALK" | "JNY";

type ResponseLeg = WalkLeg | JnyLeg;

interface CommonLeg {
  Origin: ResponseLocation,
  Destination: ResponseLocation,
  JourneyDetailRef: {
    ref: string
  },
  type: ResponseLegType
}

interface WalkLeg extends CommonLeg {
  type: "WALK",
  dist: number  // in meters
  hide: boolean // true if walk is too short?
}

interface JnyLeg extends CommonLeg {
  type: "JNY",
  direction: string,
  Product?: {
    name: string,
    line: number,
    number: number,   // used as key in other API?
    catOut: string,
    catOutS: string,  // catOutS = Category Output Short?
    catIn: string,    // catIn always same as catOutS?
    catCode: string
  },
}

interface Response {
  Trip: {
    LegList: {
      Leg: ResponseLeg[]
    },
    duration: string // in ISO-8601 format
  }[]
}

const createDateTime = ({ date, time, rtDate, rtTime }: ResponseLocation): DateTime => {
  let formattedString;

  const tripIsDelayed = rtDate && rtTime;

  if (tripIsDelayed) {
    formattedString = `${rtDate}T${rtTime}`;
  } else {
    formattedString = `${date}T${time}`;
  }

  return DateTime.fromISO(formattedString);
}

const mapLegKind = (category: number): LegKind => {
  switch (category) {
    case 1:
      return LegKind.METRO
    case 2:
      return LegKind.TRAM
    case 3:
      return LegKind.BUS
    case 6:
      return LegKind.SHIP
    default:
      return LegKind.UNKNOWN
  }
}

const mapLeg = (leg: ResponseLeg): Leg => {
  if (leg.type == "WALK") {
    if (leg.hide) {
      return null;
    }

    return {
      kind: LegKind.WALK,
      distance: leg.dist
    }
  } else {
    const { direction, Product: { line, name, catCode } } = leg;

    const kind = mapLegKind(parseInt(catCode));

    if (kind == LegKind.UNKNOWN) {
      console.warn("Unknown leg", leg);
      return {
        kind: LegKind.UNKNOWN
      }
    } else if (kind == LegKind.WALK) {
      // Never happens but here to make Typescript happy
    } else {
      return {
        kind,
        line,
        name,
        direction
      }
    }
  }
}

const mapResponseToDomain = (response: Response): Trip[] => {
  return response.Trip.map(trip => {
    const startTime = createDateTime(trip.LegList.Leg[0].Origin);
    const endTime = createDateTime(trip.LegList.Leg[trip.LegList.Leg.length - 1].Destination);

    const legs = trip.LegList.Leg
      .map(mapLeg)
      .filter(x => x);

    console.log(legs);

    return {
      startTime: startTime,
      endTime: endTime,
      duration: endTime.diff(startTime),
      legs: legs
      // duration: Duration.fromISO(trip.duration)
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
  const response = await http<Response>(url);

  return mapResponseToDomain(response);
}