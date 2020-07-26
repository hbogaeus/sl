import { LocationKind, Location } from "../../domain";

const baseUrl = '/api';

const http = async <T>(request: RequestInfo): Promise<T> => {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}


type ResponseLocation = ResponseAddress | ResponseStation;

interface ResponseAddress {
  Type: LocationKind.Address,
  Name: string,
  X: string,
  Y: string
}

interface ResponseStation {
  Type: LocationKind.Station,
  Name: string,
  SiteId: string,
}

interface Response {
  ResponseData: ResponseLocation[]
}

const formatCoordinates = (x: string, y: string): { long: string, lat: string } => ({
  long: x.substring(0, 2) + "." + x.substring(2),
  lat: y.substring(0, 2) + "." + y.substring(2),
})

export const getLocations = async (input: string): Promise<Location[]> => {
  const url = `${baseUrl}/typeahead.json?searchstring=${encodeURIComponent(input)}&stationsonly=false&maxresults=5`
  const response = await http<Response>(url);

  return response.ResponseData.map(location => {

    switch (location.Type) {
      case LocationKind.Station:
        return {
          kind: LocationKind.Station,
          name: location.Name,
          id: '123'
        }
      case LocationKind.Address:
        return {
          kind: LocationKind.Address,
          name: location.Name,
          coords: formatCoordinates(location.X, location.Y)
        }
    }
  })
}