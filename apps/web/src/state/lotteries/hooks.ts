import useSWR from 'swr'
import { useEffect, useMemo } from 'react'
import { useAppDispatch } from 'state'
import { useRouter } from 'next/router'
import { batch, useSelector } from 'react-redux'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { fetchLotteriesAsync, fetchLotteriesSgAsync } from '.'
import useSWRImmutable from 'swr/immutable'
import { FAST_INTERVAL } from 'config/constants'
import {
  currPoolSelector,
  currBribeSelector,
  poolsWithFilterSelector,
  makePoolWithUserDataLoadingSelector,
  filterSelector,
} from './selectors'
import { getRewardsForTicketId, getTag, getTicket } from './helpers'

export const useLotteriesConfigInitialize = () => {
  const { chainId } = useActiveChainId()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const fromLottery = router.query.lottery

  useEffect(() => {
    if (chainId) {
      batch(() => {
        const init = true
        dispatch(fetchLotteriesSgAsync({ fromLottery }))
        dispatch(fetchLotteriesAsync({ fromLottery, chainId, init }))
      })
    }
  }, [dispatch, chainId])
}

export const useFetchPublicPoolsData = () => {
  const { chainId } = useActiveChainId()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const fromLottery = router.query.lottery

  useSWR(
    ['/lotteries', chainId],
    async () => {
      const fetchPoolsDataWithFarms = async () => {
        batch(() => {
          dispatch(fetchLotteriesSgAsync({ fromLottery }))
          dispatch(fetchLotteriesAsync({ fromLottery, chainId }))
        })
      }
      fetchPoolsDataWithFarms()
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      refreshInterval: FAST_INTERVAL * 10,
      keepPreviousData: true,
    },
  )
}

export const usePool = (sousId): { pool?: any; userDataLoaded: boolean } => {
  const poolWithUserDataLoadingSelector = useMemo(() => makePoolWithUserDataLoadingSelector(sousId), [sousId])
  return useSelector(poolWithUserDataLoadingSelector)
}

export const usePoolsPageFetch = () => {
  useLotteriesConfigInitialize()
  useFetchPublicPoolsData()
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

export const useGetTags = () => {
  const { data } = useSWR('lotteries-tags', async () => getTag())
  return data?.name ?? ''
}

export const useGetTicket = (ticketId) => {
  const { chainId } = useActiveChainId()
  const { data } = useSWR(['lotteries-tickets', ticketId, chainId], async () => getTicket(ticketId, chainId))
  return data ?? ''
}

export const useGetRewardsForTicketId = (tokenAddress, lotteryId, ticketId) => {
  const { chainId } = useActiveChainId()
  const { data: winners } = useSWRImmutable(['rewards-for-user', tokenAddress, lotteryId, ticketId], async () => {
    try {
      const arr = Array.from({ length: 6 }, (v, i) => i)
      const res = await Promise.all(
        arr?.map(async (idx) => getRewardsForTicketId(tokenAddress, lotteryId, ticketId, idx, chainId)),
      )
      return res
    } catch (err) {
      console.log('rerr==========>', err)
    }
    return []
  })
  return winners
}
