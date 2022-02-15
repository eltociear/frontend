import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { MutationFunction, QueryFunction } from 'react-query'

import { apiClient } from 'service/apiClient'
import {
  SupportRequestResponse,
  SupportRequestInput,
} from 'components/support-form/helpers/support-form.types'
import { ContactRequestResponse, ContactRequestInput } from 'gql/contact'
import { CampaignResponse, CampaignInput } from 'gql/campaigns'

import { endpoints } from './apiEndpoints'
import { CheckoutSessionInput, CheckoutSessionResponse } from 'gql/donations'
import { CreateBeneficiaryInput, PersonResponse } from 'gql/person'
import { CompanyResponse, CompanyInput } from 'gql/companies'

export const queryFn: QueryFunction = async function ({ queryKey }) {
  const response = await apiClient.get(queryKey.join('/'))
  return await response.data
}

export const queryFnFactory = <T>(config?: AxiosRequestConfig): QueryFunction<T> =>
  async function ({ queryKey }) {
    const response = await apiClient.get(queryKey.join('/'), config)
    return await response.data
  }

export const authQueryFnFactory = <T>(token?: string): QueryFunction<T> => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  return queryFnFactory<T>({ headers })
}

export const createBeneficiary: MutationFunction<
  AxiosResponse<PersonResponse>,
  CreateBeneficiaryInput
> = async (data: CreateBeneficiaryInput) => {
  return await apiClient.post<CreateBeneficiaryInput, AxiosResponse<PersonResponse>>(
    endpoints.person.createBeneficiary.url,
    data,
  )
}

export const createContactRequest: MutationFunction<
  AxiosResponse<ContactRequestResponse>,
  ContactRequestInput
> = async (data: ContactRequestInput) => {
  return await apiClient.post<ContactRequestInput, AxiosResponse<ContactRequestResponse>>(
    endpoints.support.createInfoRequest.url,
    data,
  )
}

export const createSupportRequest: MutationFunction<
  AxiosResponse<SupportRequestResponse>,
  SupportRequestInput
> = async (data: SupportRequestInput) => {
  return await apiClient.post<SupportRequestInput, AxiosResponse<SupportRequestResponse>>(
    endpoints.support.createSupportRequest.url,
    data,
  )
}

export const createCampaign: MutationFunction<AxiosResponse<CampaignResponse>, CampaignInput> =
  async (data: CampaignInput) => {
    return await apiClient.post<CampaignInput, AxiosResponse<CampaignResponse>>(
      endpoints.campaign.createCampaign.url,
      data,
    )
  }

export const createCheckoutSession: MutationFunction<
  AxiosResponse<CheckoutSessionResponse>,
  CheckoutSessionInput
> = async (data: CheckoutSessionInput) => {
  return await apiClient.post<CheckoutSessionInput, AxiosResponse<CheckoutSessionResponse>>(
    endpoints.donation.createCheckoutSession.url,
    data,
  )
}

export const createCompany: MutationFunction<
  AxiosResponse<CompanyResponse>,
  { companyInput: CompanyInput; token: string }
> = async (data: { companyInput: CompanyInput; token: string }) => {
  return await apiClient.post<CompanyInput, AxiosResponse<CompanyResponse>>(
    endpoints.company.createCompany.url,
    data.companyInput,
    { headers: { Authorization: `Bearer ${data.token}` } },
  )
}

export const editCompany: MutationFunction<
  AxiosResponse<CompanyResponse>,
  { companyInput: CompanyInput; token: string }
> = async (data: { companyInput: CompanyInput; token: string }) => {
  return await apiClient.patch<CompanyInput, AxiosResponse<CompanyResponse>>(
    endpoints.company.editCompany(data.companyInput.id).url,
    data.companyInput,
    { headers: { Authorization: `Bearer ${data.token}` } },
  )
}

export const deleteCompany: MutationFunction<AxiosResponse<null>, { slug: string; token: string }> =
  async ({ slug, token }) => {
    return await apiClient.delete(endpoints.company.deleteCompany(slug).url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

export const deleteManyCompanies: MutationFunction<
  AxiosResponse<null>,
  { ids: string[]; token: string }
> = async ({ ids, token }) => {
  return await apiClient.post(endpoints.company.deleteMany.url, ids, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
