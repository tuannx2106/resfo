import { faBed, faEllipsisH, faHammer, faHome, faTools, faTree, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import Button from 'components/Button'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import AmenitiesCard from '../AmenitiesCard'
import s from './AmenitiesSection.module.scss'

const AmenitiesSection = () => {
  const { t } = useTranslation('propertyDetailPage')
  const [isExpand, setIsExpand] = useState<boolean>(false)

  return (
    <>
      <div
        className={clsx({
          [s.expandableArea]: true,
          [s.isExpand]: isExpand,
        })}
      >
        <AmenitiesCard
          icon={faBed}
          title="Interior details"
          amenitiesGroup={[
            {
              name: 'Bedrooms and bathrooms',
              list: ['Bedrooms: 6', 'Bathrooms: 4', 'Full bathrooms: 3', '1/2 bathrooms: 1'],
            },
            {
              name: 'Basement',
              list: ['Basement: Finished'],
            },
            {
              name: 'Heating',
              list: ['Heating features: Natural Gas, Baseboard'],
            },
            {
              name: 'Cooling',
              list: ['Cooling features: Window Unit(s)'],
            },
            {
              name: 'Other interior features',
              list: ['Common walls with other units/homes: 2+ Common Walls Attic: Full'],
            },
          ]}
        />
        <AmenitiesCard
          icon={faHome}
          title="Property details"
          amenitiesGroup={[
            {
              name: 'Parking',
              list: ['Parking features: Private'],
            },
            {
              name: 'Lot',
              list: ['Lot size: 1,710 sqft', 'Lot size dimensions: 18 x 95'],
            },
            {
              name: 'Other property information',
              list: ['Parcel number: 01558-0007'],
            },
          ]}
        />
        <AmenitiesCard
          icon={faHammer}
          title="Construction details"
          amenitiesGroup={[
            {
              name: 'Type and style',
              list: [
                'Home type: SingleFamily',
                'Architectural style: Contemporary',
                'Property subType: Single Family Residence',
              ],
            },
            {
              name: 'Material information',
              list: ['Construction materials: Brick'],
            },
            {
              name: 'Condition',
              list: ['New construction: No', 'Year built: 1901'],
            },
          ]}
        />
        <AmenitiesCard
          icon={faTools}
          title="Utilities / Green Energy Details"
          amenitiesGroup={[
            {
              name: 'Utility',
              list: ['Sewer information: Sewer', 'Water information: Public'],
            },
            {
              name: 'Green energy',
              list: ['Construction elements: Brick'],
            },
          ]}
        />
        <AmenitiesCard
          icon={faTree}
          title="Community and Neighborhood Details"
          amenitiesGroup={[
            {
              name: 'Location',
              list: ['Region: Elmhurst'],
            },
          ]}
        />
        <AmenitiesCard
          icon={faUserFriends}
          title="HOA and financial details"
          amenitiesGroup={[
            {
              name: 'Other financial information',
              list: ['Annual tax amount: $9,510'],
            },
          ]}
        />
        <AmenitiesCard
          icon={faEllipsisH}
          title="Other"
          amenitiesGroup={[
            {
              name: 'Other facts',
              list: ['Price Range: $1.1M - $1.1M'],
            },
          ]}
        />
        {!isExpand && <div className={s.collapsibleFade} />}
      </div>
      <Button className={s.btn} onClick={() => setIsExpand((prevState) => !prevState)}>
        {isExpand ? t('seeLess') : t('seeMore')}
      </Button>
    </>
  )
}

export default AmenitiesSection
