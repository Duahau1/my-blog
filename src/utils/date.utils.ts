import { DateTime } from 'luxon'
export const ISOtoLocaleString = (isoDate: string, options?: any): string => {
  return DateTime.fromISO(isoDate).toLocaleString(DateTime.DATE_FULL)
}
