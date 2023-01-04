import React, { ReactElement, useEffect } from 'react'
import type { AppProps /* , AppContext */ } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { NextPage } from 'next'
import SwiperCore, { Navigation, Pagination, Thumbs } from 'swiper'
import { store } from 'store'
import { Provider } from 'react-redux'
import { debounce as _debounce } from 'lodash'
import ChatBox from 'components/ChatBox'
import './globals.scss'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)
  SwiperCore.use([Pagination, Thumbs, Navigation])

  useEffect(() => {
    const resetFullVH = _debounce(
      () => document.documentElement.style.setProperty('--full-view-height', `${window.innerHeight}px`),
      300,
    )
    resetFullVH()
    window.addEventListener('resize', resetFullVH)

    return () => window.removeEventListener('resize', resetFullVH)
  }, [])

  return (
    <Provider store={store}>
      {getLayout(
        <div>
          <Component {...pageProps} />
          <ChatBox />
        </div>,
      )}
    </Provider>
  )
}

export default appWithTranslation(App)
