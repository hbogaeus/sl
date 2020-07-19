import React from 'react';
import styled from 'styled-components';
import { Trip } from '../../domain';
import { Duration, DateTime, Interval } from 'luxon';
import LineWithDuration from './LineWithDuration';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5rem;
`

const TripInfo = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-variant-numeric: tabular-nums;
  transition: opacity 500ms;
  opacity: ${(p: { hasPassed: boolean }) => p.hasPassed ? 0.5 : 1.0};
`

const Spacer = styled.div`
  flex-grow: 1;
`

export interface TripProps {
  trip: Trip,
  now: DateTime
}

const Trip = ({ trip, now }: TripProps) => {
  const hasPassed = trip.startTime <= now;
  let leavesIn;
  if (hasPassed) {
    leavesIn = '-';
  } else {
    leavesIn = trip.startTime.diff(now).toFormat('hh:mm');
  }

  return (
    <Content>
      <TripInfo hasPassed={hasPassed}>
        <span>{trip.startTime.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
        <LineWithDuration duration={trip.duration.toFormat('hh:mm')} />
        <span>{trip.endTime.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
        <Spacer />
        <span>{leavesIn}</span>
      </TripInfo>
    </Content>)
}

export default Trip;