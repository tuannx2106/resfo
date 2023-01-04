import Gmap from 'components/Gmap'
import PropertyItemExtraInfos from 'components/PropertyItemExtraInfos'
import DefaultLayout from 'layouts/DefaultLayout'
import { useTranslation } from 'next-i18next'
import React, { ReactElement, useState } from 'react'
import clsx from 'clsx'
import AmenitiesSection from './components/AmenitiesSection'
import Header from './components/Header'
import ImageSection from './components/ImageSection'
import LocalInformationSection from './components/LocalInformationSection'
import ModalMedia from './components/ModalMedia'
import NearbyHomeSlider from './components/NearbyHomeSlider'
import PropertyInfo from './components/PropertyInfo'
import SimilarHomeSlider from './components/SimilarHomeSlider'
import { extraInfosTest } from './helpers'
import s from './PropertyDetailPage.module.scss'
import NearbyCity from './components/NearbyCity'
import NewListingSlider from './components/NewListingSlider'
import PriceTrend from './components/PriceTrend'

const PropertyDetailPage = () => {
  const { t } = useTranslation('propertyDetailPage')
  const [isModalMediaVisible, setIsModalMediaVisible] = useState<boolean>(false)

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setIsModalMediaVisible(false)
  }
  return (
    <div className={s.root}>
      <Header />
      <ImageSection onClickImage={() => setIsModalMediaVisible(true)} />

      <div className={s.innerContent}>
        <PropertyInfo />

        <section className={s.section}>
          <h3 className={s.sectionHeadline}>{t('localInformation')}</h3>

          <LocalInformationSection
            onClickButton={() => setIsModalMediaVisible(true)}
            onClickMap={() => setIsModalMediaVisible(true)}
          />
        </section>

        <section className={s.section}>
          <h3 className={s.sectionHeadline}>{t('description')}</h3>
          <p>
            {`Gorgeous & Elegant! This 2-Story Single Family Home is the Best in Class! It is located in the desirable
          Excelsior neighborhood. Behind the modern facade, beautiful natural hardwood floors, high coffered ceilings
          and plenty of natural light flow throughout the home's open airy layout. Main level features an open living
          room, kitchen with custom made cabinetry, quartz countertops, S/S appliances, 2 bedrooms, 2 baths including 1
          master suite, and sunroom. Lower level features 1 bedroom, 1 bath, 1 family room, 1 car garage and extra
          parking in the driveway. Easy maintained backyard with organic tomatoes, lemons, lavender, & more, plus a good
          size shed for storage and patio, great BBQ and family relaxation. Fresh new exterior paint, washer & dryer
          installed. Great locations! It is just 1/2 block away from Geneva, 3 blocks from McLaren Park with easy access
          to schools, shopping, public transportation & close to BART station. Come see it today!`}
          </p>
        </section>

        <section className={s.section}>
          <h3 className={s.sectionHeadline}>{t('openHouse')}</h3>
          <div className={s.schedule}>
            <b>Saturday, October 09</b>
            <span>2:00 PM to 4:00 PM</span>
          </div>
          <div className={s.schedule}>
            <b>Saturday, October 09</b>
            <span>2:00 PM to 4:00 PM</span>
          </div>
          <div className={s.schedule}>
            <b>Saturday, October 09</b>
            <span>2:00 PM to 4:00 PM</span>
          </div>
        </section>

        <section className={s.section}>
          <h3 className={s.sectionHeadline}>{t('homeDetailFor')} 1248 Stanyan St</h3>

          <PropertyItemExtraInfos
            infos={extraInfosTest}
            wrapperClassName={s.propertyExtraInfos}
            itemClassName={s.propertyExtraInfo}
          />

          <AmenitiesSection />
        </section>

        <section className={s.section}>
          <h3 className={s.sectionHeadline}>Price History</h3>
        </section>

        <section className={s.section}>
          <h3 className={s.sectionHeadline}>{t('similarHome')}</h3>
          <SimilarHomeSlider />
        </section>

        <section className={s.section}>
          <h3 className={s.sectionHeadline}>New Listings</h3>
          <NewListingSlider />
        </section>

        <section className={s.section}>
          <h3 className={clsx(s.sectionHeadline, s.headlineGroup)}>Price Trends</h3>
          <p className={s.sectionSubHeadline}>For homes in 85251</p>
          <PriceTrend />
        </section>

        <section className={s.section}>
          <h3 className={s.sectionHeadline}>{t('neighborhood', { place: '11001' })}</h3>
          <div className={s.neighborhood}>
            <img src="/img/icon/icon_walking.svg" alt="walking score" className={s.walkingScoreIcon} />
            <b>Walk Score:</b>
            <span className={s.walkingScore}>0</span>
            <span>(Car-Dependent)</span>
          </div>
          <div className={s.neighborhoodMapWrapper}>
            <Gmap
              mapStyle={{
                width: '100%',
                height: 240,
              }}
              mapOptions={{
                zoom: 16,
                center: {
                  lat: 10.791489757811465,
                  lng: 106.65321350097656,
                },
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                maxZoom: 20,
                minZoom: 4,
              }}
            />
          </div>
        </section>

        <section className={s.section}>
          <h3 className={s.sectionHeadline}>{t('nearbyHomes')}</h3>
          <NearbyHomeSlider />
        </section>

        <section className={s.section}>
          <h3 className={s.sectionHeadline}>Nearby cities</h3>

          <NearbyCity />
        </section>

        <section className={s.section}>
          <h3 className={s.sectionHeadline}>{t('listingBy')}</h3>
          <div className={s.listingBySection}>
            <p>Suresh Persaud EXP Realty, (888) 276-0630</p>
            <p>{t('agentPhone')} (516) 445-0897</p>
            <img
              loading="lazy"
              className={s.companyLogo}
              src="https://photos.zillowstatic.com/fp/4790d622e3a6cb6c9e6461369e9ed5b1-trulia_inf_40.jpeg"
              alt="company"
            />
            <p className={s.companyDescription}>
              The data relating to real estate for sale or lease on this web site comes in part from OneKey™ MLS. Real
              estate listings held by brokerage firms other than Zillow, Inc are marked with the OneKey™ MLS logo or an
              abbreviated logo and detailed information about them includes the name of the listing broker. IDX
              information is provided exclusively for personal, non-commercial use, and may not be used for any purpose
              other than to identify prospective properties consumers may be interested in purchasing. Information is
              deemed reliable but not guaranteed. Copyright 2021 OneKey™ MLS. All rights reserved.
            </p>
            <p className={s.lastModified}>{t('listingLastModified')}: Apr 5, 2021 10:58 am</p>
          </div>
        </section>

        <ModalMedia
          visible={isModalMediaVisible}
          onCancel={closeModal}
          onOk={() => setIsModalMediaVisible(false)}
          isSaved
        />
      </div>
    </div>
  )
}

PropertyDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default PropertyDetailPage
