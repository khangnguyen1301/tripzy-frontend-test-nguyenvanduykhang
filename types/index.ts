/**
 * @file types/index.ts
 * @description Type definitions for the application
 */

export interface Location {
  short_code: string;
  english_name: string;
  code_state: string;
}

export interface SearchFormData {
  mode: "bus" | "hotel" | "flight";
  from: string;
  to: string;
  departureDate: Date | null;
  returnDate: Date | null;
  passengers: number;
}

export interface SearchParams {
  mode: string;
  from: string;
  to: string;
  dep: string;
  ret?: string;
  passengers: string;
}
