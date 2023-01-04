export type SelectOption<T = string | number> = {
  value: T
  label: string
  rangeLabel?: string
  extendValues?: string[] | number[]
}

export type RANGE_SELECTION<T = number | string> = {
  from: T
  to: T
}
