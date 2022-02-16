import { useQuery } from 'react-query'
import { KeycloakInstance } from 'keycloak-js'
import { useKeycloak } from '@react-keycloak/ssr'

import { endpoints } from 'service/apiEndpoints'
import { BankAccountResponse } from 'gql/bankaccounts'
import { authQueryFnFactory } from 'service/restRequests'

export function useBankAccountsList() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BankAccountResponse[]>(endpoints.bankAccounts.bankAccountList.url, {
    queryFn: authQueryFnFactory(keycloak?.token),
  })
}

export function useViewBankAccount(slug: string) {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  return useQuery<BankAccountResponse>(endpoints.bankAccounts.viewBankAccount(slug).url, {
    retry: 0,
    queryFn: authQueryFnFactory(keycloak?.token),
  })
}
