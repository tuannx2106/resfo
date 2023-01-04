export const toNumberWithCommas = (val: number): string => val.toLocaleString()

export const numberWithCommas = (value: string, precision = 0) => {
  if (!value) return 0
  const floatNumberFormatted = value ?
    parseFloat(parseFloat(value).toFixed(precision))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
    0
  return floatNumberFormatted
}
