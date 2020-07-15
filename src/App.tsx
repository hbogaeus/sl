import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'react-use';
import Header from './components/Header';
import SelectorArea from './components/SelectorArea';
import { Location, Trip } from './domain';
import { getTripPlan } from './lib/api';
import Trips from './components/Trips';
import Starred from './components/Starred';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const App = () => {
  const [origin, setOrigin] = useState<Location>();
  const [destination, setDestination] = useState<Location>();
  const [trips, setTrips] = useState<Trip[]>();
  const [showTrips, setShowTrips] = useState<boolean>(false);
  const [value, setValue, remove] = useLocalStorage('starred-trips', []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTrips = await getTripPlan(origin.id, destination.id);
      setTrips(fetchedTrips);
    }

    if (origin && destination) {
      console.log("Getting data", origin.id, origin.id);
      fetchData();
    } else {
      console.log("Not fetching data");
    }
  }, [origin, destination])

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
      <SelectorArea
        setOrigin={setOrigin}
        setDestination={setDestination}
      />
      {showTrips ? <Trips trips={trips} /> : <Starred locations={[]} />}
    </Content>
  )
}

export default App;