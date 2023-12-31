import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import keyBy from 'lodash/keyBy'
import { fetchPairs, fetchUserBalances } from './helpers'
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

export const fetchPairsAsync =
  ({ chainId, init = false }) =>
  async (dispatch) => {
    try {
      const pairs = await fetchPairs({ chainId })
      if (init) {
        dispatch(setInitialPairsConfig(pairs || []))
      } else {
        dispatch(setPairsPublicData(pairs || []))
      }
    } catch (error) {
      console.error('[Pools Action]============> error when getting pairs', error)
    }
  }

export const fetchPoolsUserDataAsync = createAsyncThunk<
  { sousId: number; stakingTokenBalance: any }[],
  { account: string; chainId: any }
>(
  'pool/fetchPoolsUserData',
  async (
    account,
    chainId,
    // { rejectWithValue }
  ) => {
    try {
      const [stakingTokenBalances] = await Promise.all([fetchUserBalances(account, chainId)])
      const userData = stakingTokenBalances || []
      return userData
    } catch (e) {
      // return rejectWithValue(e)
    }
  },
)

export const PoolsSlice = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    setInitialPairsConfig: (state, action) => {
      state.data = [...action.payload]
      state.userDataLoaded = true
    },
    setPairsPublicData: (state, action) => {
      const livePoolsSousIdMap = keyBy(action.payload, 'sousId')
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsSousIdMap[pool.sousId]
        return { ...pool, ...livePoolData }
      })
      state.userDataLoaded = true
    },
    setPairsUserData: (state, action) => {
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
    builder.addCase(fetchPoolsUserDataAsync.fulfilled, (state, action) => {
      const userData = action.payload
      const userDataSousIdMap = keyBy(userData, 'sousId')
      state.data = state.data.map((pool) => ({
        ...pool,
        userDataLoaded: true,
        userData: userDataSousIdMap[pool.sousId],
      }))
      state.userDataLoaded = true
    })
    builder.addCase(fetchPoolsUserDataAsync.rejected, (state, action) => {
      console.error('[Pools Action] Error fetching pool user data', action.payload)
    })
  },
})

// Actions
export const {
  setInitialPairsConfig,
  setPairsPublicData,
  setPairsUserData,
  setCurrBribeData,
  setCurrPoolData,
  setFilters,
} = PoolsSlice.actions

export default PoolsSlice.reducer
