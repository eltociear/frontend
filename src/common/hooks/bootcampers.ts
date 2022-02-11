import { useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { BootcampType } from 'gql/bootcamp'

export function useBootcampList() {
  return useQuery<BootcampType[]>(endpoints.bootcamp.students.url)
}

export function useViewBootcamper(id: string) {
  return useQuery<BootcampType>(endpoints.bootcamp.viewBootcamper(id).url)
}
