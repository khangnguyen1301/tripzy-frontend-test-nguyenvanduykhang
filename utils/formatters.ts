/**
 * @file utils/formatters.ts
 * @description Formatting utilities
 */

/**
 * Formats a Date object to ISO date string (YYYY-MM-DD)
 * @param date - The date to format
 * @returns Formatted date string or empty string if date is null
 */
export const formatDateToISO = (date: Date | null): string => {
  if (!date) return '';
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Formats a Date object to display format (DD/MM/YYYY)
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatDateToDisplay = (date: Date | null): string => {
  if (!date) return '';
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};
