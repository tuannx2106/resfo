import React, { ReactNode } from 'react'
import AppHeader from 'layouts/AppHeader'
import AppFooter from 'layouts/AppFooter'

const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <>
    <AppHeader />
    <main>{children}</main>
    <AppFooter />
  </>
)

export default DefaultLayout
