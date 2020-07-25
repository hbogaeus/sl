import React, { FC } from 'react';
import styled from 'styled-components';
import { Leg, LegKind } from '../../../domain';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.7rem;
`

const Type = styled.span`
  padding-bottom: 0.2rem;
  font-size: 0.8rem;
`

const Extra = styled.span`
  font-size: 0.7rem;
`

export interface LegProps {
  leg: Leg
}

const mapKindToLabel = (leg: Leg): string => {
  if (leg.kind === LegKind.WALK || leg.kind === LegKind.UNKNOWN) {
    return leg.kind;
  } else {
    return `${leg.kind} ${leg.line}`;
  }

}

const mapKindToExtra = (leg: Leg): string | number => {
  switch (leg.kind) {
    case LegKind.WALK:
      return `${leg.distance} m`;
    case LegKind.UNKNOWN:
      return '-'
    default:
      return leg.direction;
  }
}

const Leg: React.FC<LegProps> = ({ leg }: LegProps) => {
  const label = mapKindToLabel(leg);
  const extra = mapKindToExtra(leg);

  return (
    <Content>
      <Type>{label}</Type>
      <Extra>{extra}</Extra>
    </Content>
  )
}

export default Leg;