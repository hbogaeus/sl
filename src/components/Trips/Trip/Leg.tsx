import React, { FC } from 'react';
import styled from 'styled-components';
import { Leg, LegKind } from '../../../domain';
import WalkIcon from '../../../icons/walk.png';
import TrainIcon from '../../../icons/train.png';
import MetroIcon from '../../../icons/metro.png';
import TramIcon from '../../../icons/tram.png';
import BusIcon from '../../../icons/bus.png';
import ShipIcon from '../../../icons/ship.png';
import { Color, colorMapping } from '../../../lib/colormappings';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.7rem;
`

const Label = styled.span<Color>`
  padding: 0.1rem 0.25rem;
  margin-bottom: 0.2rem;
  border-radius: 2px;
  font-size: 0.7rem;
  background: ${p => p.background};
  color: ${p => p.foreground};
`

const Image = styled.img`
  width: 1.5rem;
`

const Extra = styled.span`
  font-size: 0.7rem;
`

const mapKindToIcons = (leg: Leg): string | JSX.Element => {
  switch (leg.kind) {
    case LegKind.WALK:
      return <Image src={WalkIcon} />
    case LegKind.TRAIN:
      return <Image src={TrainIcon} />
    case LegKind.METRO:
      return <Image src={MetroIcon} />
    case LegKind.TRAM:
      return <Image src={TramIcon} />
    case LegKind.BUS:
      return <Image src={BusIcon} />
    case LegKind.SHIP:
      return <Image src={ShipIcon} />
    case LegKind.UNKNOWN:
      return '-';
  }
}

const mapKindToLabel = (leg: Leg): string => {
  if (leg.kind === LegKind.WALK) {
    return `${leg.kind} ${leg.distance} m`;
  } else if (leg.kind === LegKind.UNKNOWN) {
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

export interface LegProps {
  leg: Leg
}

const Leg: React.FC<LegProps> = ({ leg }: LegProps) => {
  const label = mapKindToLabel(leg);
  const extra = mapKindToExtra(leg);

  const color = colorMapping(leg);

  return (
    <Content>
      <Label foreground={color.foreground} background={color.background}>{label}</Label>
    </Content>
  )
}

export default Leg;