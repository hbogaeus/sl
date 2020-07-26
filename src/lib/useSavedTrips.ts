import { useLocalStorage } from "react-use"
import { SavedTrip, Location } from "../domain";
import values from 'lodash/values';

const SAVED_TRIPS_KEY = 'saved-trips';

const hash = (from: Location, to: Location): number => {
  const value = `${from.name}${to.name}`;

  let hash = 0;
  if (value.length == 0) {
    return hash;
  }
  for (let i = 0; i < value.length; i++) {
    let char = value.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
}

interface PersistedSavedTrips {
  [key: number]: SavedTrip
}

export const useSavedTrips = (): [SavedTrip[], typeof toggleSaved, typeof isSaved] => {
  const [persistedTrips, setValue] = useLocalStorage<PersistedSavedTrips>(SAVED_TRIPS_KEY, {});

  const isSaved = (from: Location, to: Location): boolean => {
    const hashCode = hash(from, to);
    return (persistedTrips as PersistedSavedTrips).hasOwnProperty(hashCode);
  }

  const saveTrip = (from: Location, to: Location): void => {
    const hashCode = hash(from, to);

    setValue({ ...persistedTrips, [hashCode]: { from, to } });
  }

  const unsaveTrip = (from: Location, to: Location): void => {
    const hashCode = hash(from, to);

    const { [hashCode]: value, ...updated } = persistedTrips as PersistedSavedTrips;

    setValue(updated);
  }

  const toggleSaved = (from: Location, to: Location): void => {
    if (isSaved(from, to)) {
      unsaveTrip(from, to);
    } else {
      saveTrip(from, to);
    }
  }

  const savedTrips = values(persistedTrips)

  return [savedTrips, toggleSaved, isSaved];
}