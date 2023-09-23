import { isAddress } from 'utils'
import { createSlice } from '@reduxjs/toolkit'
import { fetchSponsors, getSponsors } from './helpers'
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

export const fetchSponsorSgAsync =
  ({ fromSponsor }) =>
  async (dispatch) => {
    try {
      const whereClause = isAddress(fromSponsor)
        ? {
            active: true,
            id_in: [fromSponsor?.toLowerCase()],
          }
        : {
            active: true,
          }
      const sponsors = await getSponsors(0, 0, whereClause)
      dispatch(setSponsorsPublicData(sponsors || []))
    } catch (error) {
      console.error('[Pools Action]============> error when getting sponsors', error)
    }
  }

export const fetchSponsorsAsync =
  ({ fromSponsor }) =>
  async (dispatch) => {
    try {
      const sponsors = await fetchSponsors({ fromSponsor })
      dispatch(setSponsorsPublicData(sponsors || []))
    } catch (error) {
      console.error('[Pools Action]============> error when getting sponsors from blockchain', error)
    }
  }

export const PoolsSlice = createSlice({
  name: 'Sponsors',
  initialState,
  reducers: {
    setSponsorsPublicData: (state, action) => {
      state.data = [...action.payload]
      state.userDataLoaded = true
    },
    setSponsorsUserData: (state, action) => {
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
export const { setSponsorsPublicData, setSponsorsUserData, setCurrBribeData, setCurrPoolData, setFilters } =
  PoolsSlice.actions

export default PoolsSlice.reducer
