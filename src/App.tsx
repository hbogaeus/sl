import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import { Trip, Location } from './domain';
import { getTripPlan } from './lib/api';
import Trips from './components/Trips';
import SavedTrips from './components/SavedTrips/SavedTrips';
import { useSavedTrips } from './lib/useSavedTrips';
import LocationSelect from './components/LocationSelect';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const TripSelect = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.6rem 1.2rem;
`

const PaddedLocationSelect = styled(LocationSelect)`
  padding: 4px 0;
`

const Label = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  margin: 0.6rem 1.2rem 0 1.2rem;
  border-bottom: solid 1px #019cd5;
  padding-bottom: 6px;
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
  const [showTrips, setShowTrips] = useState<boolean>(false);
  const [savedTrips, saveTrip] = useSavedTrips();

  const setTrip = (from: Location, to: Location): void => {
    setFrom(from);
    setTo(to);
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTrips = await getTripPlan(from, to);
      setTrips(fetchedTrips);
    }

    if (from && to) {
      fetchData();
    }
  }, [from, to])

  useEffect(() => {
    if (trips) {
      setShowTrips(true);
    }
  }, [trips]);

  /*
  useEffect(() => {
    const testTrips: Trip[] = [
      {
        startTime: "17:47:00",
        endTime: "18:10:00",
        duration: "PT23M",
      },
      {
        startTime: "17:49:00",
        endTime: "18:18:00",
        duration: "PT24M",
      }
    ];
    setTrips(testTrips);
  }, []);
  */

  return (
    <Content>
      <Header />
      {/* <Label>New Trip</Label> */}
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
      {/* <Label>Saved Trip</Label> */}
      {showTrips ? <Trips trips={trips} /> : <SavedTrips setTrip={setTrip} savedTrips={savedTrips} />}
    </Content>
  )
}

export default App;