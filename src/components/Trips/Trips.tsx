import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TripComponent from './Trip';
import { Trip } from '../../domain';
import { DateTime } from 'luxon';
import Spinner from '../Spinner';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.6rem 1.2rem;
`

const SpinnerContainer = styled(Content)`
  align-items: center;
  justify-content: center;
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
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
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