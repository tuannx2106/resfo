import { SelectOption } from 'globalTypes/form'
import { PROPERTY_SORT_BY } from './types'

export const PROPERTY_SORT_BY_OPTIONS: SelectOption[] = [
  {
    value: PROPERTY_SORT_BY.POST_DATE,
    label: 'sort.postDate',
  },
  {
    value: PROPERTY_SORT_BY.UPDATE_DATE,
    label: 'sort.updateDate',
  },
  {
    value: PROPERTY_SORT_BY.PAID_LISTING,
    label: 'sort.paidListing',
  },
  {
    value: PROPERTY_SORT_BY.MOST_VIEW_LISTING,
    label: 'sort.mostViewListing',
  },
]
