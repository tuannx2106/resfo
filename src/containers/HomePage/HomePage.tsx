import React, { ReactElement } from 'react'
import DefaultLayout from 'layouts/DefaultLayout'
import SearchSection from './SearchSection'
import ServiceSection from './ServiceSection'

const HomePage = () => (
  <>
    <SearchSection />
    <ServiceSection />
  </>
)

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default HomePage
