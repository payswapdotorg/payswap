import BigNumber from 'bignumber.js'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { createSelector } from '@reduxjs/toolkit'
import { State, VaultKey } from '../types'

const selectPoolsData = (state: State) => state.futureCollaterals?.data
const selectPoolData = (sousId) => (state: State) => state.futureCollaterals?.data.find((p) => p.sousId === sousId)
const selectUserDataLoaded = (state: State) => state.futureCollaterals?.userDataLoaded
const selectVault = (key: VaultKey) => (state: State) =>
  key && state.futureCollaterals ? state.futureCollaterals[key] : {}
const selectIfo = (state: State) => state.futureCollaterals.ifo
const selectIfoUserCredit = (state: State) => state.futureCollaterals.ifo.credit ?? BIG_ZERO

const selectCurrBribe = (state: State) => state.futureCollaterals?.currBribe
const selectCurrPool = (state: State) => state.futureCollaterals?.currPool
const selectFilters = (state: State) => state.futureCollaterals?.filters
const selectFilteredData = (state: State) => {
  return state.futureCollaterals?.data.filter((futureCollateral) => {
    return (
      (!state.futureCollaterals.filters.country ||
        state.futureCollaterals.filters.country.includes('All') ||
        state.futureCollaterals.filters.country.filter((value) =>
          futureCollateral?.countries?.toLowerCase()?.split(',').includes(value?.toLowerCase()),
        )?.length) &&
      (!state.futureCollaterals.filters.city ||
        state.futureCollaterals.filters.city.includes('All') ||
        state.futureCollaterals.filters.city.filter((value) =>
          futureCollateral?.cities?.toLowerCase()?.split(',').includes(value?.toLowerCase()),
        )?.length > 0) &&
      (!state.futureCollaterals.filters.product ||
        state.futureCollaterals.filters.product.filter((value) =>
          futureCollateral?.products?.toLowerCase()?.split(',').includes(value?.toLowerCase()),
        )?.length > 0)
    )
  })
}
export const filterSelector = createSelector([selectFilters], (filters) => {
  return filters
})

export const currBribeSelector = createSelector([selectCurrBribe], (currBribe) => {
  return currBribe
})

export const currPoolSelector = createSelector([selectCurrPool], (currPool) => {
  return currPool
})

export const poolsWithFilterSelector = createSelector(
  [selectFilteredData, selectUserDataLoaded],
  (pools, userDataLoaded) => {
    return { pools, userDataLoaded }
  },
)

export const makePoolWithUserDataLoadingSelector = (sousId) =>
  createSelector([selectPoolData(sousId), selectUserDataLoaded], (pool, userDataLoaded) => {
    return {
      pool, // : transformPool(pool),
      userDataLoaded,
    }
  })

export const poolsWithUserDataLoadingSelector = createSelector(
  [selectPoolsData, selectUserDataLoaded],
  (pools, userDataLoaded) => {
    return {
      pools, // : pools.map(transformPool),
      userDataLoaded,
    }
  },
)

export const makeVaultPoolByKey = (key) => createSelector([selectVault(key)], (vault) => null) // transformVault(key, vault))

export const poolsWithVaultSelector = createSelector(
  [
    poolsWithUserDataLoadingSelector,
    makeVaultPoolByKey(VaultKey.CakeVault),
    makeVaultPoolByKey(VaultKey.CakeFlexibleSideVault),
  ],
  (poolsWithUserDataLoading, deserializedLockedCakeVault, deserializedFlexibleSideCakeVault) => {
    //   const { pools, userDataLoaded } = poolsWithUserDataLoading
    //   const cakePool = pools.find((pool) => !pool.isFinished && pool.sousId === 0)
    //   const withoutCakePool = pools.filter((pool) => pool.sousId !== 0)

    //   const cakeAutoVault = cakePool && {
    //     ...cakePool,
    //     ...deserializedLockedCakeVault,
    //     vaultKey: VaultKey.CakeVault,
    //     userData: { ...cakePool.userData, ...deserializedLockedCakeVault.userData },
    //   }

    //   const lockedVaultPosition = getVaultPosition(deserializedLockedCakeVault.userData)
    //   const hasFlexibleSideSharesStaked = deserializedFlexibleSideCakeVault.userData.userShares.gt(0)

    //   const cakeAutoFlexibleSideVault =
    //     cakePool && (lockedVaultPosition > VaultPosition.Flexible || hasFlexibleSideSharesStaked)
    //       ? [
    //           {
    //             ...cakePool,
    //             ...deserializedFlexibleSideCakeVault,
    //             vaultKey: VaultKey.CakeFlexibleSideVault,
    //             userData: { ...cakePool.userData, ...deserializedFlexibleSideCakeVault.userData },
    //           },
    //         ]
    //       : []

    //   const allPools = [...cakeAutoFlexibleSideVault, ...withoutCakePool]
    //   if (cakeAutoVault) {
    //     allPools.unshift(cakeAutoVault)
    //   }
    return {
      pools: [], // allPools,
      userDataLoaded: true,
    }
  },
)

export const makeVaultPoolWithKeySelector = (vaultKey) =>
  createSelector(poolsWithVaultSelector, ({ pools }) => pools.find((p) => p.vaultKey === vaultKey))

export const ifoCreditSelector = createSelector([selectIfoUserCredit], (ifoUserCredit) => {
  return new BigNumber(ifoUserCredit)
})

export const ifoCeilingSelector = createSelector([selectIfo], (ifoData) => {
  return new BigNumber(ifoData.ceiling)
})
