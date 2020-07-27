import React from 'react';
import { DateTime, Duration } from 'luxon';
import { Trip, LegKind } from '../../domain';
import Trips from './Trips';

export default { title: 'Trips' };

const testTrips: Trip[] = [
  {
    startTime: DateTime.fromISO("08:47:00"),
    endTime: DateTime.fromISO("10:10:00"),
    duration: Duration.fromISO("PT23M"),
    legs: [
      {
        kind: LegKind.WALK,
        distance: 1500
      },
      {
        kind: LegKind.BUS,
        line: 165,
        direction: "Farsta centrum",
        name: "Buss 165",
        detailsId: 'detailsId'
      },
      {
        kind: LegKind.METRO,
        line: 18,
        direction: "Åkeshov",
        name: "tunnelbanans gröna linje 18",
        detailsId: 'detailsId'
      }
    ]
  },
  {
    startTime: DateTime.fromISO("17:49:00"),
    endTime: DateTime.fromISO("18:18:00"),
    duration: Duration.fromISO("PT24M"),
    legs: [
      {
        kind: LegKind.WALK,
        distance: 1500
      },
      {
        kind: LegKind.BUS,
        line: 165,
        direction: "Farsta centrum",
        name: "Buss 165",
        detailsId: 'detailsId'
      },
      {
        kind: LegKind.METRO,
        line: 18,
        direction: "Åkeshov",
        name: "tunnelbanans gröna linje 18",
        detailsId: 'detailsId'
      }
    ]
  },
  {
    startTime: DateTime.fromISO("23:08:00"),
    endTime: DateTime.fromISO("18:18:00"),
    duration: Duration.fromISO("PT24M"),
    legs: [
      {
        kind: LegKind.WALK,
        distance: 1500
      },
      {
        kind: LegKind.BUS,
        line: 165,
        direction: "Farsta centrum",
        name: "Buss 165",
        detailsId: 'detailsId'
      },
      {
        kind: LegKind.TRAM,
        line: 22,
        direction: "Åkeshov",
        name: "tunnelbanans gröna linje 18",
        detailsId: 'detailsId'
      },
      {
        kind: LegKind.METRO,
        line: 18,
        direction: "Åkeshov",
        name: "tunnelbanans gröna linje 18",
        detailsId: 'detailsId'
      }
    ]
  },
  {
    startTime: DateTime.fromISO("23:10:00"),
    endTime: DateTime.fromISO("18:18:00"),
    duration: Duration.fromISO("PT24M"),
    legs: [
      {
        kind: LegKind.METRO,
        line: 18,
        direction: "Åkeshov",
        name: "tunnelbanans gröna linje 18",
        detailsId: 'detailsId'
      }
    ]
  }
];

export const withTrips = () => (
  <Trips trips={testTrips} loading={false} />
);

export const loading = () => (
  <Trips trips={testTrips} loading={true} />
);
