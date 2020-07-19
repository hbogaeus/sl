import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import { Trip, Location } from './domain';
import { getTripPlan } from './lib/api';
import Trips from './components/Trips/Trips';
import SavedTrips from './components/SavedTrips/SavedTrips';
import { useSavedTrips } from './lib/useSavedTrips';
import LocationSelect from './components/LocationSelect';
import { DateTime, Duration } from 'luxon';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const TripSelect = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.6rem 1.2rem 0 1.2rem;
`

const PaddedLocationSelect = styled(LocationSelect)`
  padding: 4px 0;
`

const Label = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  margin: 0.6rem 1.2rem 0 1.2rem;
  border-bottom: solid 1px #019cd5;
  padding-bottom: 0.6rem;
`

const SaveTripButton = styled.button`
  background-color: hsl(0,0%,100%);
  border-color: hsl(0,0%,80%);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  position: relative;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
`

const App = () => {
  const [from, setFrom] = useState<Location>();
  const [to, setTo] = useState<Location>();
  const [trips, setTrips] = useState<Trip[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showTrips, setShowTrips] = useState<boolean>(false);
  const [savedTrips, saveTrip] = useSavedTrips();

  const setTrip = (from: Location, to: Location): void => {
    setFrom(from);
    setTo(to);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedTrips = await getTripPlan(from, to);
      setTrips(fetchedTrips);
      setLoading(false);
    }

    if (from && to) {
      setShowTrips(true);
      fetchData();
    }
  }, [from, to])

  useEffect(() => {
    const testTrips: Trip[] = [
      {
        startTime: DateTime.fromISO("08:47:00"),
        endTime: DateTime.fromISO("10:10:00"),
        duration: Duration.fromISO("PT23M"),
      },
      {
        startTime: DateTime.fromISO("17:49:00"),
        endTime: DateTime.fromISO("18:18:00"),
        duration: Duration.fromISO("PT24M"),
      },
      {
        startTime: DateTime.fromISO("17:54:00"),
        endTime: DateTime.fromISO("18:18:00"),
        duration: Duration.fromISO("PT24M"),
      },
      {
        startTime: DateTime.fromISO("17:58:00"),
        endTime: DateTime.fromISO("18:18:00"),
        duration: Duration.fromISO("PT24M"),
      }
    ];
    setTrips(testTrips);
    setShowTrips(true);
  }, []);

  return (
    <Content>
      <Label>New Trip</Label>
      <TripSelect>
        <PaddedLocationSelect
          label="From..."
          value={from}
          onChange={setFrom} />
        <PaddedLocationSelect
          label="To..."
          value={to}
          onChange={setTo} />
      </TripSelect>
      {showTrips ?
        <>
          <Label>Trips</Label>
          <button onClick={() => setShowTrips(false)}>Close</button>
          <Trips
            loading={loading}
            trips={trips} />
        </>
        :
        <>
          <Label>Saved Trips</Label>
          <SavedTrips
            setTrip={setTrip}
            savedTrips={savedTrips} />
        </>
      }
    </Content>
  )
}

export default App;