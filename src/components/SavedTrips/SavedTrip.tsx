import React from 'react';
import styled from 'styled-components';
import { SavedTrip, Location } from '../../domain';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  min-height: 3rem;
  background-color: #ffffff;
  justify-content: space-around;
  border-radius: 2px;
  padding: 0.4rem 0.8rem;
  border: solid 1px rgb(227,227,227);
  box-shadow: 0 1px 2px rgba(0,0,0,.025);
`

export interface SavedTripProps {
  savedTrip: SavedTrip,
  setTrip: (from: Location, to: Location) => void
}

const SavedTrip = ({ savedTrip: { from, to }, setTrip }: SavedTripProps) => {
  return (
    <Content onClick={() => setTrip(from, to)}>
      <span>{from.name}</span>
      <span>{to.name}</span>
    </Content>
  )
}

export default SavedTrip;