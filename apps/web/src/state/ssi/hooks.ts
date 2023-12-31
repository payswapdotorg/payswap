import { FetchStatus } from 'config/constants/types'
import useSWR, { KeyedMutator } from 'swr'
import { getProfileData, getEmailList } from './helpers'

export const useProfileFromSSI = (
  address: string,
  fetchConfiguration = {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  },
): {
  profile?: any
  isFetching: boolean
  isValidating: boolean
  refresh: KeyedMutator<any>
} => {
  const { data, status, mutate, isValidating } = useSWR(
    address ? [address, 'profile'] : null,
    () => getProfileData(1, 0, address?.toLowerCase()),
    fetchConfiguration,
  )
  return {
    profile: data,
    isFetching: status === FetchStatus.Fetching,
    isValidating,
    refresh: mutate,
  }
}

export const useGetEmailList = (followers, profile) => {
  const {
    data,
    status,
    mutate: refetch,
  } = useSWR(['getemaillist', followers, profile?.id], async () => getEmailList(followers, profile))
  return { data, refetch, status }
}
