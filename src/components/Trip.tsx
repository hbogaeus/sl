import React from 'react';
import styled from 'styled-components';
import { Trip } from '../domain';
import { Duration, DateTime } from 'luxon';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
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

export interface TripProps {
  trip: Trip
}

const formatDuration = (duration: string): string => {
  const { hours, minutes } = Duration.fromISO(duration).toObject();
  let formattedDuration = '';

  if (hours) {
    formattedDuration += `${hours} h`
  }

  if (minutes) {
    formattedDuration += `${minutes} m`
  }
  return formattedDuration;
}

const formatTime = (time: string): string => {
  return DateTime.fromISO(time).toLocaleString(DateTime.TIME_24_SIMPLE);
}

const Trip = ({ trip }: TripProps) => {
  const duration = formatDuration(trip.duration);
  const startTime = formatTime(trip.startTime);
  const endTime = formatTime(trip.endTime);

  return (
    <Content>
      <TripInfo>
        <Time>{startTime}</Time>
        <Time>{endTime}</Time>
        <TripDuration>{duration}</TripDuration>
      </TripInfo>
    </Content>)
}

export default Trip;