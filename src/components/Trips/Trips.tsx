import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TripComponent from './Trip';
import { Trip } from '../../domain';
import { DateTime } from 'luxon';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.6rem 1.2rem;
`

const Labels = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #939393;
  font-size: 0.8rem;
`

export interface TripsProps {
  trips: Trip[],
  loading: boolean
}

const Trips = ({ trips, loading }: TripsProps) => {
  const [now, setNow] = useState<DateTime>(DateTime.local());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(DateTime.local());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <Content>
        <span>Loading!</span>
      </Content>
    )
  }

  return (
    <Content>
      {trips.map(trip =>
        <TripComponent
          key={`${trip.duration}${trip.startTime}${trip.endTime}`}
          now={now}
          trip={trip} />
      )}
    </Content>
  )
}

export default Trips;