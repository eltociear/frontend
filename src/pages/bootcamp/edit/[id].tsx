import { queryFn } from 'common/rest'
import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BootcamperEditPage from 'components/bootcamp/BootcamperEditPage'

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { id } = query
  const client = new QueryClient()

  await client.prefetchQuery(`/bootcamp/${id}`, queryFn)
  return {
    props: {
      id,
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation', 'bootcamp'])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default BootcamperEditPage
