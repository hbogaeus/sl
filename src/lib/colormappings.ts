import { LegKind, Leg } from "../domain"

const PALETTE = {
  blue: '#0691D2',
  pink: '#F166A7',
  orange: '#E08220',
  green: '#21B259',
  red: '#E21A21',
  purple: '#A05EA6',
  teal: '#00AAAD',   // Line 25, ship
  gray: '#80857E',   // Line 7
  grayer: '#738BA4', // Line 12
  brown: '#B56631',  // Line 21
  black: '#4c555a',
  white: '#ffffff'
} as const;

type Colors = typeof PALETTE[keyof typeof PALETTE];

export interface Color {
  foreground: Colors,
  background: Colors
}

const GREEN_LINES = [17, 18, 19];
const RED_LINES = [13, 14];
const BLUE_LINES = [10, 11];

const mapMetroLines = (line: number): Color => {
  switch (line) {
    case 17:
    case 18:
    case 19:
      return {
        background: PALETTE.green,
        foreground: PALETTE.white
      }
    case 13:
    case 14:
      return {
        background: PALETTE.red,
        foreground: PALETTE.white
      }

    case 10:
    case 11:
      return {
        background: PALETTE.blue,
        foreground: PALETTE.white
      }
    default:
      return {
        background: PALETTE.white,
        foreground: PALETTE.black
      }
  }
}

export const colorMapping = (leg: Leg): Color => {
  switch (leg.kind) {
    case LegKind.WALK:
    case LegKind.UNKNOWN:
    case LegKind.BUS:
      return {
        background: PALETTE.white,
        foreground: PALETTE.black
      }
    case LegKind.METRO:
      return mapMetroLines(leg.line)
    case LegKind.TRAM:
      return {
        background: PALETTE.orange,
        foreground: PALETTE.white
      }
    case LegKind.TRAIN:
      return {
        background: PALETTE.pink,
        foreground: PALETTE.white
      }
    case LegKind.SHIP:
      return {
        background: PALETTE.teal,
        foreground: PALETTE.white
      }
  }
}