/* eslint-disable no-shadow */
import { SelectOption } from 'globalTypes/form'
import { cloneDeep as _cloneDeep } from 'lodash'

export enum CHANGE_TARGET {
  FROM = 'from',
  TO = 'to',
}

export const getRangeOptions = <T = string | number>(
  options: SelectOption<T>[],
  val: T,
  change: CHANGE_TARGET = CHANGE_TARGET.FROM,
): Record<string, SelectOption<T>[]> => {
  let fromOptions: SelectOption<T>[] = []
  let toOptions: SelectOption<T>[] = []

  if (change === CHANGE_TARGET.FROM) {
    fromOptions = _cloneDeep(options)
    toOptions = options.filter((option) => Number(option.value) !== 0 && option.value > val)
  } else {
    toOptions = _cloneDeep(options)
    fromOptions = options.filter((option) => Number(option.value) !== 0 && option.value < val)
  }

  return {
    fromOptions,
    toOptions,
  }
}
