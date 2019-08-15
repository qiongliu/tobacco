import * as types from './mutations-types'

const mutations = {
    [types.SET_LOADING](state, isLoading) {
        state.loading = isLoading
    },
    [types.SET_CURRENT_STATIONID](state, id) {
        state.currentStationId = id
    }
}

export default mutations