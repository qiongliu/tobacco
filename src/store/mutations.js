import * as types from './mutations-types'

const mutations = {
    [types.SET_LOADING](state, isLoading) {
        state.loading = isLoading
    }
}

export default mutations