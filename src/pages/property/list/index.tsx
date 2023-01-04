import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    sampleProps: 'sample',
    ...(await serverSideTranslations(String(locale), ['common', 'propertyListPage'])),
  },
})

export { default } from 'containers/PropertyListPage'
