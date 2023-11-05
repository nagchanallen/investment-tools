import { DateTime } from 'luxon'

export const fromISOStringToUTCDateTime = (str: string) => {
  return DateTime.fromISO(str).toUTC()
}

export const fromISOStringToUTCDate = (dateTime: DateTime) => {
  return dateTime.toUTC().toFormat('dd MMM yyyy')
}

export const fromDateTimeToISOString = (dateTime: DateTime) => {
  return dateTime.toUTC().toISO()
}
