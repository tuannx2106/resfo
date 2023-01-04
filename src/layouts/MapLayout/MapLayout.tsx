import React, { ReactElement } from 'react'
import AppHeader from 'layouts/AppHeader'

const MapLayout = ({ children }: { children: ReactElement }) => (
  // TODO: check the scroll lock body
  // useEffect(() => {
  //   const scrollableDiv = scrollableDivRef.current
  //   disableBodyScroll(scrollableDiv as HTMLElement)

  //   return () => enableBodyScroll(scrollableDiv as HTMLElement)
  // }, [])

  <>
    <AppHeader />

    <main>{children}</main>
  </>
)

export default MapLayout
