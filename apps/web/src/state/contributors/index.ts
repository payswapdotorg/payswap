import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import keyBy from 'lodash/keyBy'
import { fetchContributors, fetchContributorsUserData } from './helpers'
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

export const fetchContributorsGaugesAsync =
  ({ chainId, init = false }) =>
  async (dispatch) => {
    try {
      const businesses = await fetchContributors(chainId)
      const data = businesses
      if (init) {
        dispatch(setInitialContributorsConfig(data || []))
      } else {
        dispatch(setContributorsPublicData(data || []))
      }
    } catch (error) {
      console.error('[Pools Action] error when getting contributor gauges======>', error)
    }
  }

export const fetchContributorsUserDataAsync = createAsyncThunk<
  { sousId: number; allowance: any; profileId: number; tokenIds: any; bribes: any }[],
  { account: string; chainId: any }
>('pool/fetchPoolsUserData', async ({ account, chainId }, { rejectWithValue }) => {
  try {
    const allBribes = await fetchContributorsUserData(account, pools, chainId)
    const userData = pools.map((pool) => ({
      sousId: parseInt(pool.sousId),
      allowance: 0,
      profileId: allBribes?.find((entry) => parseInt(entry.sousId) === parseInt(pool.sousId))?.profileId,
      tokenIds: allBribes?.find((entry) => parseInt(entry.sousId) === parseInt(pool.sousId))?.tokenIds,
      bribes: allBribes?.find((entry) => parseInt(entry.sousId) === parseInt(pool.sousId))?.augmentedBribes,
    }))
    console.log('userData================>', userData)
    return userData
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const PoolsSlice = createSlice({
  name: 'Contributors',
  initialState,
  reducers: {
    setInitialContributorsConfig: (state, action) => {
      state.data = [...action.payload]
      state.userDataLoaded = true
    },
    setContributorsPublicData: (state, action) => {
      const livePoolsSousIdMap = keyBy(action.payload, 'sousId')
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsSousIdMap[pool.sousId]
        return { ...pool, ...livePoolData }
      })
      state.userDataLoaded = true
    },
    setContributorsUserData: (state, action) => {
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
    builder.addCase(fetchContributorsUserDataAsync.fulfilled, (state, action) => {
      const userData = action.payload
      const userDataSousIdMap = keyBy(userData, 'sousId')
      state.data = state.data.map((pool) => ({
        ...pool,
        userDataLoaded: true,
        userData: userDataSousIdMap[pool.sousId],
      }))
      state.userDataLoaded = true
    })
    builder.addCase(fetchContributorsUserDataAsync.rejected, (state, action) => {
      console.error('[Pools Action] Error fetching pool user data', action.payload)
    })
  },
})

// Actions
export const {
  setInitialContributorsConfig,
  setContributorsPublicData,
  setContributorsUserData,
  setCurrBribeData,
  setCurrPoolData,
  setFilters,
} = PoolsSlice.actions

export default PoolsSlice.reducer
