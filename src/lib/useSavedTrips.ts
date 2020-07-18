import { useLocalStorage } from "react-use"
import { SavedTrip, Location } from "../domain";
import some from 'lodash/some';
import isEqual from 'lodash/isEqual';

const SAVED_TRIPS_KEY = 'saved-trips';

export const useSavedTrips = (): [SavedTrip[], typeof saveTrip, typeof unsaveTrip] => {
  const [savedTrips, setValue, remove] = useLocalStorage<SavedTrip[]>(SAVED_TRIPS_KEY, []);

  const isSaved = (from: Location, to: Location): boolean => {
    return some<SavedTrip>(savedTrips, (trip) => isEqual(trip.from, from) && isEqual(trip.to, to))
  }

  const saveTrip = (from: Location, to: Location): void => {
    setValue([...savedTrips, { from, to }]);
  }

  const unsaveTrip = (index: number): void => {
    setValue([
      ...savedTrips.slice(0, index),
      ...savedTrips.slice(index + 1)
    ])
  }

  return [savedTrips, saveTrip, unsaveTrip];
}