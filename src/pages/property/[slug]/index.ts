import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export { default } from 'containers/PropertyDetailPage'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    sampleProps: 'sample',
    ...(await serverSideTranslations(String(locale), ['common', 'propertyDetailPage', 'propertyItem'])),
  },
})

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})
