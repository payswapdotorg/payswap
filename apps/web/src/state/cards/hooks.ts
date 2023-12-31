import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { batch, useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import useSWR from 'swr'
import { fetchCardsAsync, fetchCardSgAsync } from '.'
import {
  currPoolSelector,
  currBribeSelector,
  poolsWithFilterSelector,
  makePoolWithUserDataLoadingSelector,
} from './selectors'

export const useCardsConfigInitialize = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const fromCard = router.query.card
  const { chainId } = useActiveChainId()

  useEffect(() => {
    if (chainId) {
      batch(() => {
        const init = true
        dispatch(fetchCardSgAsync({ fromCard }))
        dispatch(fetchCardsAsync({ fromCard, chainId, init }))
      })
    }
  }, [dispatch, chainId])
}

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const fromCard = router.query.card
  const { chainId } = useActiveChainId()

  useSWR(['cards', chainId], () => {
    const fetchPoolsDataWithFarms = async () => {
      batch(() => {
        dispatch(fetchCardSgAsync({ fromCard }))
        dispatch(fetchCardsAsync({ fromCard, chainId }))
      })
    }

    fetchPoolsDataWithFarms()
  })
}

export const usePool = (sousId): { pool?: any; userDataLoaded: boolean } => {
  const poolWithUserDataLoadingSelector = useMemo(() => makePoolWithUserDataLoadingSelector(sousId), [sousId])
  return useSelector(poolWithUserDataLoadingSelector)
}

export const usePoolsPageFetch = () => {
  useCardsConfigInitialize()
  useFetchPublicPoolsData()
}

export const useCurrBribe = () => {
  return useSelector(currBribeSelector)
}

export const useCurrPool = () => {
  return useSelector(currPoolSelector)
}

export const usePoolsWithFilterSelector = () => {
  return useSelector(poolsWithFilterSelector)
}
