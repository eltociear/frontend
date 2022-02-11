// import { queryFn } from 'common/rest'
import { GetServerSideProps } from 'next'
// import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BootcamperCreatePage from 'components/bootcamp/BootcamperCreatePage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  // const client = new QueryClient()
  // await client.prefetchQuery('/bootcamp', queryFn)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation', 'bootcamp'])),
      // dehydratedState: dehydrate(client),
    },
  }
}

export default BootcamperCreatePage
