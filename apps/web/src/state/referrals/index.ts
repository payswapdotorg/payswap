import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import keyBy from 'lodash/keyBy'
import { fetchReferrals, fetchReferralsUserData } from './helpers'
import { resetUserState } from '../global/actions'

export const initialFilterState = Object.freeze({
  workspace: null,
  country: null,
  city: null,
})

const initialState: any = {
  data: [],
  userDataLoaded: false,
  apiData: [],
  filters: initialFilterState,
  currBribe: {},
  currPool: {},
}

let pools = []

export const fetchReferralGaugesAsync =
  ({ chainId, init = false }) =>
  async (dispatch) => {
    try {
      const referrals = await fetchReferrals({ chainId })
      const data = referrals
      if (init) {
        dispatch(setInitialReferralsConfig(data || []))
      } else {
        dispatch(setReferralsPublicData(data || []))
      }
    } catch (error) {
      console.error('[Pools Action] error when getting referral gauges======>', error)
    }
  }

export const fetchReferralsUserDataAsync = createAsyncThunk<
  { sousId: number; allowance: any; bribes: any }[],
  { account: string; chainId: any }
>('pool/fetchPoolsUserData', async ({ account, chainId }, { rejectWithValue }) => {
  try {
    const allBribes = await fetchReferralsUserData(account, pools, chainId)
    const userData = pools.map((pool) => ({
      sousId: parseInt(pool.sousId),
      allowance: 0,
      profileId: allBribes?.find((entry) => parseInt(entry.sousId) === parseInt(pool.sousId))?.profileId,
      // tokenIds: allBribes?.find((entry) => parseInt(entry.sousId) === parseInt(pool.sousId))?.tokenIds,
      bribes: allBribes?.find((entry) => parseInt(entry.sousId) === parseInt(pool.sousId))?.augmentedBribes,
    }))
    console.log('userData================>', userData)
    return userData
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const PoolsSlice = createSlice({
  name: 'Referrals',
  initialState,
  reducers: {
    setInitialReferralsConfig: (state, action) => {
      state.data = [...action.payload]
      state.userDataLoaded = true
    },
    setReferralsPublicData: (state, action) => {
      const livePoolsSousIdMap = keyBy(action.payload, 'sousId')
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsSousIdMap[pool.sousId]
        return { ...pool, ...livePoolData }
      })
      state.userDataLoaded = true
    },
    setReferralsUserData: (state, action) => {
      const { sousId } = action.payload
      state.data = state.data.map((pool) => {
        if (pool.sousId === sousId) {
          return { ...pool, userDataLoaded: true, userData: action.payload.data }
        }
        return pool
      })
    },
    setCurrBribeData: (state, action) => {
      state.currBribe = action.payload
    },
    setCurrPoolData: (state, action) => {
      state.currPool = action.payload
    },
    setFilters: (state, action) => {
      state.filters = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetUserState, (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state.data = state.data.map(({ userData, ...pool }) => {
        return { ...pool }
      })
      state.userDataLoaded = false
    })
    builder.addCase(fetchReferralsUserDataAsync.fulfilled, (state, action) => {
      const userData = action.payload
      const userDataSousIdMap = keyBy(userData, 'sousId')
      state.data = state.data.map((pool) => ({
        ...pool,
        userDataLoaded: true,
        userData: userDataSousIdMap[pool.sousId],
      }))
      state.userDataLoaded = true
    })
    builder.addCase(fetchReferralsUserDataAsync.rejected, (state, action) => {
      console.error('[Pools Action] Error fetching pool user data', action.payload)
    })
  },
})

// Actions
export const {
  setInitialReferralsConfig,
  setReferralsPublicData,
  setReferralsUserData,
  setCurrBribeData,
  setCurrPoolData,
  setFilters,
} = PoolsSlice.actions

export default PoolsSlice.reducer
