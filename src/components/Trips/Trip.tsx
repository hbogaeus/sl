import React from 'react';
import styled from 'styled-components';
import { Trip } from '../../domain';
import { Duration, DateTime, Interval } from 'luxon';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const TripInfo = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Time = styled.span`
`

const Arrow = styled.div`
`

const Spacer = styled.div`
  flex-grow: 1;
`

const TripDuration = styled.div`

`

const formatDuration = (duration: Duration): string => {
  return duration.toFormat('hh:mm');
}

const formatTime = (time: DateTime): string => {
  return time.toLocaleString(DateTime.TIME_24_SIMPLE);
}

const calculateLeavesIn = (startTime: DateTime, now: DateTime): string => {
  if (startTime >= now) {
    return startTime.diff(now).toFormat('hh:mm');
  } else {
    return '-'
  }
}

export interface TripProps {
  trip: Trip,
  now: DateTime
}

const Trip = ({ trip, now }: TripProps) => {
  const duration = formatDuration(trip.duration);
  const leavesIn = calculateLeavesIn(trip.startTime, now);

  return (
    <Content>
      <TripInfo>
        <Time>{formatTime(trip.startTime)}</Time>
        <Time>{formatTime(trip.endTime)}</Time>
        <TripDuration>{duration}</TripDuration>
        <TripDuration>{leavesIn}</TripDuration>
      </TripInfo>
    </Content>)
}

export default Trip;