import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import { Trip, Location } from './domain';
import { getTripPlan } from './lib/api';
import Trips from './components/Trips/Trips';
import SavedTrips from './components/SavedTrips/SavedTrips';
import { useSavedTrips } from './lib/useSavedTrips';
import LocationSelect from './components/LocationSelect';
import Button from './components/Button';
import Icon from './components/Icon';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.6rem 1.2rem 0 1.2rem;
`

const TripSelect = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const SwapButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.6rem;
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
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
  }, [from, to]);

  const swapSelectedLocations = (): void => {
    setFrom(to);
    setTo(from);
  }

  /*
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
  */

  return (
    <Content>
      <Header />
      <Wrapper>
        <Label>New Trip</Label>
        <Controls>
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
          <SwapButtonWrapper>
            <Button
              disabled={from == undefined && to == undefined}
              onClick={() => swapSelectedLocations()}
            >
              <Icon>↕</Icon>
            </Button>
          </SwapButtonWrapper>
        </Controls>
        {showTrips ?
          <>
            <Label>Trip Results</Label>
            <Button onClick={() => setShowTrips(false)}>Close</Button>
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
      </Wrapper>
    </Content>
  )
}

export default App;