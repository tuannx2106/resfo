export const copyToClipboard = (text: string, cb?: () => void) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      if (cb) cb()
    })
  } else {
    const el = document.createElement('textarea')
    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    if (cb) cb()
    document.body.removeChild(el)
  }
}

const toDegreesMinutesAndSeconds = (coordinate: number): string => {
  const absolute = Math.abs(coordinate)
  const degrees = Math.floor(absolute)
  const minutesNotTruncated = (absolute - degrees) * 60
  const minutes = Math.floor(minutesNotTruncated)
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60)

  // 10°47'36.2"N
  return `${degrees}°${minutes}'${seconds}"`
}

export const convertToDMS = (lat: number, lng: number): string => {
  const latitude = toDegreesMinutesAndSeconds(lat)
  const latitudeCardinal = lat >= 0 ? 'N' : 'S'

  const longitude = toDegreesMinutesAndSeconds(lng)
  const longitudeCardinal = lng >= 0 ? 'E' : 'W'

  // 10°47'36.2"N 106°40'56.9"E
  return `${latitude}${latitudeCardinal} ${longitude}${longitudeCardinal}`
}
