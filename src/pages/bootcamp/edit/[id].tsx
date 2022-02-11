import { queryFn } from 'common/rest'
import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BootcamperEditPage from 'components/bootcamp/BootcamperEditPage'

import { endpoints } from 'common/api-endpoints'
import { axios } from 'common/api-client'
import { useViewBootcamper } from 'common/hooks/bootcampers'

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { id } = query
  const client = new QueryClient()

  // const { data: values }  = await useViewBootcamper(String(id))

  const { data: values } = await axios.get(endpoints.bootcamp.viewBootcamper(String(id)).url)
  await client.prefetchQuery(`/bootcamp/${id}`, queryFn)
  return {
    props: {
      values,
      id,
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation'])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default BootcamperEditPage
