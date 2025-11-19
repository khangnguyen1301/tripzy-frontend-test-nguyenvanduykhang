/**
 * @file utils/validators.ts
 * @description Validation utilities for search form
 */

import { SearchFormData } from '@/types';

export interface ValidationErrors {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: string;
}

/**
 * Validates search form data
 * @param data - The form data to validate
 * @returns Object containing validation errors, or empty object if valid
 */
export const validateSearchForm = (data: SearchFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate From field
  if (!data.from || data.from.trim() === '') {
    errors.from = 'Please select departure location';
  }

  // Validate To field
  if (!data.to || data.to.trim() === '') {
    errors.to = 'Please select destination location';
  }

  // Validate same location
  if (data.from && data.to && data.from === data.to) {
    errors.to = 'Destination must be different from departure location';
  }

  // Validate Departure Date
  if (!data.departureDate) {
    errors.departureDate = 'Please select departure date';
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const depDate = new Date(data.departureDate);
    depDate.setHours(0, 0, 0, 0);

    if (depDate < today) {
      errors.departureDate = 'Departure date cannot be in the past';
    }
  }

  // Validate Return Date
  if (data.returnDate && data.departureDate) {
    const depDate = new Date(data.departureDate);
    depDate.setHours(0, 0, 0, 0);
    const retDate = new Date(data.returnDate);
    retDate.setHours(0, 0, 0, 0);

    if (retDate < depDate) {
      errors.returnDate = 'Return date must be on or after departure date';
    }
  }

  // Validate Passengers
  if (!data.passengers || data.passengers < 1) {
    errors.passengers = 'At least 1 passenger is required';
  }

  return errors;
};

/**
 * Checks if the validation errors object has any errors
 * @param errors - The validation errors object
 * @returns True if there are errors, false otherwise
 */
export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
