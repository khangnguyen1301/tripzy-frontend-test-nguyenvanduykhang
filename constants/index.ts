/**
 * @file constants/index.ts
 * @description Application constants
 */

export const TABS = {
  BUS: 'bus',
  HOTEL: 'hotel',
  FLIGHT: 'flight',
} as const;

export const TAB_LABELS = {
  [TABS.BUS]: 'Bus & Shuttle',
  [TABS.HOTEL]: 'Hotel & Accommodation',
  [TABS.FLIGHT]: 'Flight',
} as const;

export const MIN_PASSENGERS = 1;
export const MAX_PASSENGERS = 10;
export const DEFAULT_PASSENGERS = 1;
