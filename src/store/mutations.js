import * as types from './mutations-types'

const mutations = {
    [types.SET_LOADING](state, isLoading) {
        state.loading = isLoading
    },
    [types.SET_CURRENT_STATIONID](state, id) {
        state.currentStationId = id
    },
    [types.SET_WEATHER_FEATURE](state, feature) {
        state.weatherFeature = feature
    },
    [types.SET_AREA](state, area) {
        state.area = area
    }
}

export default mutations