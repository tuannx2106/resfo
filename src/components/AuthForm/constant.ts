import { SelectOption } from 'globalTypes/form'
import { PROFESSIONAL_TYPES } from './type'

export const ProfessionalCategoryOptions: SelectOption<PROFESSIONAL_TYPES>[] = [
  {
    label: 'realEstateAgentBroker',
    value: PROFESSIONAL_TYPES.AGENT_BROKER,
  },
  {
    label: 'mortgageLender',
    value: PROFESSIONAL_TYPES.LENDER,
  },
  {
    label: 'homeImprovementServices',
    value: PROFESSIONAL_TYPES.HOME_IMPROVE_SERVICES,
  },
  {
    label: 'landlord',
    value: PROFESSIONAL_TYPES.LANDLORD,
  },
  {
    label: 'photographer',
    value: PROFESSIONAL_TYPES.PHOTOGRAPHER,
  },
  {
    label: 'homeBuilder',
    value: PROFESSIONAL_TYPES.HOME_BUILDER,
  },
  {
    label: 'homeInspector',
    value: PROFESSIONAL_TYPES.HOME_INSPECTOR,
  },
  {
    label: 'propertyManager',
    value: PROFESSIONAL_TYPES.PROPERTY_MANAGER,
  },
  {
    label: 'otherRealEstateProfessional',
    value: PROFESSIONAL_TYPES.OTHER_PROFESSIONAL,
  },
]
