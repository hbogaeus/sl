const baseUrl = '/api';

const http = async <T>(request: RequestInfo): Promise<T> => {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

interface Response {
  Stops: {
    Stop: {
      name: string,

      depDate?: string,
      depTime?: string,
      rtDepDate?: string,
      rtDepTime?: string

      arrDate?: string,
      arrTime?: string,
      rtArrDate?: string,
      rtArrTime?: string

    }[],
  }
}

const testRef = "1|25472|0|74|26072020";

export const getJourneyDetails = async (id: string = testRef): Promise<any[]> => {
  let apiUrl = `${baseUrl}/TravelplannerV3_1/journeydetail.json`;
  let params = new URLSearchParams({ id: id, poly: "0" });

  const url = `${apiUrl}?${params.toString()}`
  const response = await http<Response>(url);
  console.log(response.Stops);

  return Promise.resolve([]);
}