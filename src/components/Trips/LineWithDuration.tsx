import { displayPartsToString } from "typescript";
import React from 'react';
import styled from 'styled-components';

const LineWrapper = styled.span`
  display: flex;
  color: #4c555a;
  width: 100px;
  flex-direction: row;
  font-size: 0.8rem;
  text-transform: uppercase;

  margin: 0 6px;

  &::before, &::after {
    content: '';
    flex: 1 1;
    border-bottom: solid 1px #4c555a;
    margin: auto;
  }
`

const Duration = styled.span`
  margin: 0 6px;
`

export interface LineWithDurationProps {
  duration: string
}

const LineWithDuration = ({ duration }: LineWithDurationProps) => (
  <LineWrapper>
    <Duration>{duration}</Duration>
  </LineWrapper>
);

export default LineWithDuration;