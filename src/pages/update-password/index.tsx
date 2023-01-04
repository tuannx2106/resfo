import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(String(context.locale), ['common', 'updatePasswordPage'])),
    },
  }
}

export { default } from 'containers/UpdatePasswordPage'
