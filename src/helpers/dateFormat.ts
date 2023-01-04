import dayjs from 'dayjs'

export const toRelativeDiffTime = (diffTime: number): string => {
  if (!dayjs(diffTime).isValid()) return 'invalid'

  if (dayjs().diff(dayjs(diffTime), 'year') >= 1) {
    return `${dayjs().diff(dayjs(diffTime), 'year')} years ago`
  }

  if (dayjs().diff(dayjs(diffTime), 'month') >= 1) {
    return `${dayjs().diff(dayjs(diffTime), 'month')} months ago`
  }

  if (dayjs().diff(dayjs(diffTime), 'week') >= 1) {
    return `${dayjs().diff(dayjs(diffTime), 'week')} weeks ago`
  }

  if (dayjs().diff(dayjs(diffTime), 'day') >= 1) {
    return `${dayjs().diff(dayjs(diffTime), 'day')} days ago`
  }

  if (dayjs().diff(dayjs(diffTime), 'hour') >= 1) {
    return `${dayjs().diff(dayjs(diffTime), 'hour')} hours ago`
  }

  if (dayjs().diff(dayjs(diffTime), 'minute') >= 1) {
    return `${dayjs().diff(dayjs(diffTime), 'minute')} minutes ago`
  }

  return `${dayjs().diff(dayjs(diffTime), 'second')} seconds ago`
}
