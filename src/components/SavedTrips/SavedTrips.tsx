import React from 'react';
import styled from 'styled-components';
import Star from '../StarIcon';
import { SavedTrip, Location } from '../../domain';
import SavedTripComponent from './SavedTrip';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`

const SavedTripsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.6rem 1.2rem 0 1.2rem;
`

const NoSavedTrips = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  margin: 0.6rem 1.2rem 0 1.2rem;
`

export interface SavedTripsProps {
  savedTrips: SavedTrip[],
  setTrip: (from: Location, to: Location) => void
}

const SavedTrips = ({ savedTrips, setTrip }: SavedTripsProps) => {
  if (savedTrips.length == 0)
    return (
      <NoSavedTrips>
        No <Star filled={true} /> trips yet.
      </NoSavedTrips>
    )

  return (
    <Content>
      <SavedTripsWrapper>
        {savedTrips.map(trip => <SavedTripComponent key={`${trip.from.name}${trip.to.name}`} setTrip={setTrip} savedTrip={trip} />)}
      </SavedTripsWrapper>
    </Content>
  )
}

export default SavedTrips;