import { createSlice } from '@reduxjs/toolkit'
import { fetchLotteries, getLotteries } from './helpers'
import { resetUserState } from '../global/actions'
import { isAddress } from 'utils'
import { keyBy } from 'lodash'

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

export const fetchLotteriesSgAsync =
  ({ fromLottery }) =>
  async (dispatch) => {
    try {
      const whereClause = isAddress(fromLottery)
        ? {
            // active: true,
            id_in: [fromLottery?.toLowerCase()],
          }
        : {
            // active: true
          }
      const lotteries = await getLotteries(0, 0, whereClause)
      dispatch(setLotteriesPublicData(lotteries || []))
    } catch (error) {
      console.error('[Pools Action]============>sg', error)
    }
  }

export const fetchLotteriesAsync =
  ({ fromLottery, chainId, init = false }) =>
  async (dispatch) => {
    try {
      const lotteries = await fetchLotteries({ fromLottery, chainId })
      if (init) {
        dispatch(setInitialLotteriesConfig(lotteries || []))
      } else {
        dispatch(setLotteriesPublicData(lotteries || []))
      }
    } catch (error) {
      console.error('[Pools Action]============>', error)
    }
  }

export const PoolsSlice = createSlice({
  name: 'Lotteries',
  initialState,
  reducers: {
    setInitialLotteriesConfig: (state, action) => {
      state.data = [...action.payload]
      state.userDataLoaded = true
    },
    setLotteriesPublicData: (state, action) => {
      const livePoolsSousIdMap = keyBy(action.payload, 'sousId')
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsSousIdMap[pool.sousId]
        return { ...pool, ...livePoolData }
      })
      state.userDataLoaded = true
    },
    setLotteriesUserData: (state, action) => {
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
  },
})

// Actions
export const {
  setInitialLotteriesConfig,
  setLotteriesPublicData,
  setLotteriesUserData,
  setCurrBribeData,
  setCurrPoolData,
  setFilters,
} = PoolsSlice.actions

export default PoolsSlice.reducer
