// Maintenance time constants in milliseconds
export const MAINTENANCE_TIME = {
  SECONDS: (seconds: number) => seconds * 1000,
  MINUTES: (minutes: number) => minutes * 60 * 1000,
  HOURS: (hours: number) => hours * 60 * 60 * 1000,
  DAYS: (days: number) => days * 24 * 60 * 60 * 1000,
  WEEKS: (weeks: number) => weeks * 7 * 24 * 60 * 60 * 1000,
  MONTHS: (months: number) => months * 30 * 24 * 60 * 60 * 1000,
}

// Default maintenance duration (2 days)
export const DEFAULT_MAINTENANCE_DURATION = MAINTENANCE_TIME.DAYS(2)

// Function to calculate end date based on start date and duration
export function calculateMaintenanceEndDate(startDate: Date, duration: number): Date {
  return new Date(startDate.getTime() + duration)
}
