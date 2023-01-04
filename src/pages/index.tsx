import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    sampleProps: 'sample props',
    ...(await serverSideTranslations(String(locale), ['common', 'homepage'])),
  },
})

export { default } from 'containers/HomePage'
