/* eslint-disable no-shadow */
import { SelectOption } from 'globalTypes/form'
import { cloneDeep as _cloneDeep } from 'lodash'

export const getRangeOptions = <T = string | number>(
  options: SelectOption<T>[],
  val: T[],
  maxVal: T,
): Record<string, SelectOption<T>[]> => {
  const from = _cloneDeep(options)
  from.unshift({
    value: 0 as any,
    label: '$0+',
  })

  const fromOptions = from.filter((option) => option.value < val[1])
  const toOptions = _cloneDeep(options)
    .filter((option) => option.value > val[0])
    .concat({
      label: 'Any Price',
      value: maxVal,
    })

  return {
    fromOptions,
    toOptions,
  }
}
