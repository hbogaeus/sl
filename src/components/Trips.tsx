import React from 'react';
import styled from 'styled-components';
import TripComponent from './Trip';
import { Trip } from '../domain';

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
  trips: Trip[]
}

const Trips = ({ trips }: TripsProps) => (
  <Content>
    <Labels>
      <span>Leaves</span>
      <span>Arrives</span>
      <span>Duration</span>
    </Labels>
    {trips.map(trip => <TripComponent key={`${trip.duration}${trip.startTime}${trip.endTime}`} trip={trip} />)}
  </Content>
)

export default Trips;