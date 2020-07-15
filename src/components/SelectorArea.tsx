import React, { useState } from 'react';
import LocationSelect from '../components/LocationSelect';
import styled from 'styled-components';
import { Location } from '../domain';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
`

const PaddedLocationSelect = styled(LocationSelect)`
  padding: 4px 0;
`

export interface SelectorAreaProps {
  setOrigin: (location: Location) => void
  setDestination: (location: Location) => void
}

const SelectorArea = ({ setOrigin, setDestination }: SelectorAreaProps) => (
  <Content>
    <PaddedLocationSelect label="From..." onChange={setOrigin} />
    <PaddedLocationSelect label="To..." onChange={setDestination} />
  </Content>
)

export default SelectorArea;