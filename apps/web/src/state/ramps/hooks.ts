import useSWR from 'swr'
import { useEffect, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { batch, useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useFastRefreshEffect, useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { FAST_INTERVAL } from 'config/constants'
import useSWRImmutable from 'swr/immutable'
import axios from 'axios'
import NodeRSA from 'encrypt-rsa'

import { useActiveChainId } from 'hooks/useActiveChainId'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { fetchRampAsync, fetchRampsAsync } from '.'
import { VaultKey } from '../types'
import {
  makePoolWithUserDataLoadingSelector,
  makePoolWithUserDataLoadingSelector2,
  makeVaultPoolByKey,
  poolsWithVaultSelector,
  ifoCreditSelector,
  ifoCeilingSelector,
  makeVaultPoolWithKeySelector,
  currPoolSelector,
  filterSelector,
  currBribeSelector,
  poolsWithFilterSelector,
} from './selectors'
import { requiresApproval } from 'utils/requiresApproval'
import { getAccountSg, getRampSg, getSession, getTag, getTokenData } from './helpers'

export const useRampsConfigInitialize = () => {
  const { chainId } = useActiveChainId()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (chainId) {
      batch(() => {
        const init = true
        dispatch(fetchRampsAsync({ chainId, init }))
      })
    }
  }, [dispatch, chainId])
}

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveChainId()

  useSWR(
    ['/ramps', chainId],
    async () => {
      const fetchPoolsDataWithFarms = async () => {
        batch(() => {
          dispatch(fetchRampsAsync({ chainId }))
        })
      }

      fetchPoolsDataWithFarms()
    },
    {
      revalidateOnFocus: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      refreshInterval: FAST_INTERVAL * 3,
      keepPreviousData: true,
    },
  )
}

export const fetchPoolsDataWithFarms = async (ramp, dispatch) => {
  const { chainId } = useActiveChainId()
  if (ramp) {
    batch(() => {
      dispatch(fetchRampAsync(ramp, chainId))
    })
  }
}

export const usePool = (sousId: number): { pool: any; userDataLoaded: boolean } => {
  const poolWithUserDataLoadingSelector = useMemo(() => makePoolWithUserDataLoadingSelector(sousId), [sousId])
  return useSelector(poolWithUserDataLoadingSelector)
}

export const usePool2 = (address): { pool?: any; userDataLoaded: boolean } => {
  const poolWithUserDataLoadingSelector = useMemo(() => makePoolWithUserDataLoadingSelector2(address), [address])
  return useSelector(poolWithUserDataLoadingSelector)
}

export const usePoolsWithVault = () => {
  return useSelector(poolsWithVaultSelector)
}

export const useDeserializedPoolByVaultKey = (vaultKey) => {
  const vaultPoolWithKeySelector = useMemo(() => makeVaultPoolWithKeySelector(vaultKey), [vaultKey])

  return useSelector(vaultPoolWithKeySelector)
}

export const usePoolsConfigInitialize = () => {
  // const dispatch = useAppDispatch()
  // const { chainId } = useActiveChainId()
  // useEffect(() => {
  //   if (chainId) {
  //     dispatch(setInitialPoolConfig({ chainId }))
  //   }
  // }, [dispatch, chainId])
}

export const useCurrBribe = () => {
  return useSelector(currBribeSelector)
}

export const useCurrPool = () => {
  return useSelector(currPoolSelector)
}

export const useFilters = () => {
  return useSelector(filterSelector)
}

export const usePoolsWithFilterSelector = () => {
  return useSelector(poolsWithFilterSelector)
}

export const useGetSessionInfoSg = (sessionId, rampAddress) => {
  const {
    data,
    status,
    mutate: refetch,
  } = useSWR(['ramp-session-info', sessionId ?? '0', rampAddress], async () => getSession(sessionId, rampAddress))
  return { data, refetch, status }
}

export const useGetTokenData = (tokenAddress) => {
  const { chainId } = useActiveChainId()
  const {
    data,
    status,
    mutate: refetch,
  } = useSWR(['token-data', tokenAddress, chainId], async () => getTokenData(tokenAddress, chainId))
  return { data, refetch, status }
}

export const useGetAccountSg = (accountAddress, channel) => {
  const {
    data,
    status,
    mutate: refetch,
  } = useSWR(['account-data', accountAddress, channel], async () => getAccountSg(accountAddress, channel))
  return { data, refetch, status }
}

export const useGetSessionInfo = (sessionId, sk) => {
  const nodeRSA = new NodeRSA(process.env.NEXT_PUBLIC_PUBLIC_KEY, process.env.NEXT_PUBLIC_PRIVATE_KEY)
  try {
    const sk0 = sk
      ? nodeRSA.decryptStringWithRsaPrivateKey({
          text: sk,
          privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
        })
      : ''
    const {
      data,
      status,
      mutate: refetch,
    } = useSWRImmutable(['stripe-session-info', sessionId ?? '0', sk0], async () =>
      axios.post('/api/check', { sessionId, sk: sk0 }),
    )
    return { data: data?.data, refetch, status }
  } catch (err) {
    return {
      data: null,
      refetch: null,
    }
  }
}

export const useGetSessionInfo2 = (sessionId, sk) => {
  try {
    const {
      data,
      status,
      mutate: refetch,
    } = useSWRImmutable(['stripe-session-info-paycard', sessionId ?? '0', sk], async () =>
      axios.post('/api/check', { sessionId, sk }),
    )
    return { data: data?.data, refetch, status }
  } catch (err) {
    return {
      data: null,
      refetch: null,
    }
  }
}

export const useGetRamp = (rampAddress) => {
  const {
    data,
    status,
    mutate: refetch,
  } = useSWRImmutable(['ramp-info', rampAddress], async () => getRampSg(rampAddress))
  return { data, refetch, status }
}

export const useGetRequiresApproval = (c, a, s) => {
  const { data, status } = useSWR(['ramps', 'allowance', s.toLowerCase()], async () => requiresApproval(c, a, s))
  return {
    status,
    needsApproval: data ?? true,
  }
}

export const useGetTags = () => {
  const { data } = useSWR('ramps-tags', async () => getTag())
  return data?.name ?? ''
}

export const usePoolsPageFetch = () => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useAccountActiveChain()

  useRampsConfigInitialize()
  useFetchPublicPoolsData()

  useFastRefreshEffect(() => {
    if (chainId) {
      batch(() => {
        if (account) {
          // dispatch(fetchPoolsUserDataAsync({ account, chainId }))
        }
      })
    }
  }, [account, chainId, dispatch])
}

export const useCakeVaultUserData = () => {
  const { address: account } = useAccount()
  const dispatch = useAppDispatch()
  const { chainId } = useActiveChainId()

  useFastRefreshEffect(() => {
    if (account && chainId) {
      // // dispatch(fetchCakeVaultUserData({ account, chainId }))
    }
  }, [account, dispatch, chainId])
}

export const useCakeVaultPublicData = () => {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveChainId()
  useFastRefreshEffect(() => {
    if (chainId) {
      // dispatch(fetchCakeVaultPublicData(chainId))
    }
  }, [dispatch, chainId])
}

export const useFetchIfo = () => {
  const { account, chainId } = useAccountActiveChain()
  const dispatch = useAppDispatch()

  usePoolsConfigInitialize()

  // useSWRImmutable(
  //   chainId && ['fetchIfoPublicData', chainId],
  //   async () => {
  //     const cakePriceFarms = await getCakePriceFarms(chainId)
  //     await dispatch(fetchFarmsPublicDataAsync({ pids: cakePriceFarms, chainId }))
  //     batch(() => {
  //       dispatch(fetchCakePoolPublicDataAsync())
  //       dispatch(fetchCakeVaultPublicData(chainId))
  //       dispatch(fetchIfoPublicDataAsync(chainId))
  //     })
  //   },
  //   {
  //     refreshInterval: FAST_INTERVAL,
  //   },
  // )

  // useSWRImmutable(
  //   account && chainId && ['fetchIfoUserData', account, chainId],
  //   async () => {
  //     batch(() => {
  //       dispatch(fetchCakePoolUserDataAsync({ account, chainId }))
  //       // dispatch(fetchCakeVaultUserData({ account, chainId }))
  //       dispatch(fetchUserIfoCreditDataAsync({ account, chainId }))
  //     })
  //   },
  //   {
  //     refreshInterval: FAST_INTERVAL,
  //   },
  // )

  // useSWRImmutable(chainId && ['fetchCakeVaultFees', chainId], async () => {
  //   dispatch(fetchCakeVaultFees(chainId))
  // })
}

export const useCakeVault = () => {
  return useVaultPoolByKey(VaultKey.CakeVault)
}

export const useVaultPoolByKey = (key: VaultKey) => {
  const vaultPoolByKey = useMemo(() => makeVaultPoolByKey(key), [key])

  return useSelector(vaultPoolByKey)
}

export const useIfoCredit = () => {
  return useSelector(ifoCreditSelector)
}

export const useIfoCeiling = () => {
  return useSelector(ifoCeilingSelector)
}
