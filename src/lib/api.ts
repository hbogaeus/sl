import { Location, Trip } from "../domain";

const baseUrl = '/api';

const http = async <T>(request: RequestInfo): Promise<T> => {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

interface LocationsResponse {
  ResponseData: {
    Name: string,
    SiteId: string
  }[]
}

export const getLocations = async (input: string): Promise<Location[]> => {
  const url = `${baseUrl}/typeahead.json?searchstring=${encodeURIComponent(input)}&stationsonly=false&maxresults=5`
  const response = await http<LocationsResponse>(url);

  return response.ResponseData.map(({ Name, SiteId }) => ({ name: Name, id: SiteId }))
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
    duration: string
  }[]
}

const mapResponseToDomain = (response: TripPlanResponse): Trip[] => {
  return response.Trip.map((trip) => ({
    startTime: trip.LegList.Leg[0].Origin.time,
    endTime: trip.LegList.Leg[0].Destination.time,
    duration: trip.duration
  }))
}

export const getTripPlan = async (originId: string, destId: string): Promise<Trip[]> => {
  const url = `${baseUrl}/TravelplannerV3_1/trip.json?originId=${originId}&destId=${destId}`
  console.log(url);
  const response = await http<TripPlanResponse>(url);

  return mapResponseToDomain(response);
}