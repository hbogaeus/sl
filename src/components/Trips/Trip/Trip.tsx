import React from 'react';
import styled from 'styled-components';
import { Trip } from '../../../domain';
import { DateTime } from 'luxon';
import LineWithDuration from './LineWithDuration';
import Spacer from '../../Spacer';
import Leg from './Leg';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
  opacity: ${(p: { hasPassed: boolean }) => p.hasPassed ? 0.5 : 1.0};
  border: solid 1px rgb(227,227,227);
  box-shadow: 0 1px 2px rgba(0,0,0,.025);
  transition: opacity 500ms;
  background-color: #ffffff;
  border-radius: 2px;
  padding: 0.4rem 0.8rem;
`

const TripInfo = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-variant-numeric: tabular-nums;
  padding-bottom: 0.4rem;
`

const Legs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export interface TripProps {
  trip: Trip,
  now: DateTime
}

const Trip = ({ now, trip: { startTime, endTime, duration, legs } }: TripProps) => {
  const hasPassed = startTime <= now;
  let leavesIn;
  if (hasPassed) {
    leavesIn = '-';
  } else {
    leavesIn = startTime.diff(now).toFormat('hh:mm');
  }

  return (
    <Content hasPassed={hasPassed}>
      <TripInfo >
        <span>{startTime.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
        <LineWithDuration duration={duration.toFormat('hh:mm')} />
        <span>{endTime.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
        <Spacer />
        <span>{leavesIn}</span>
      </TripInfo>
      <Legs>
        {legs.map((leg, index) => <Leg key={index} leg={leg} />)}
      </Legs>
    </Content>)
}

export default Trip;