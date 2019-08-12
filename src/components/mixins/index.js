import {
  mapMutations
} from 'vuex'

export default {
  methods: {
    showLoading() {
      this.setLoading(true)
    },
    hideLoading() {
      this.setLoading(false)
    },
    ...mapMutations({
      setLoading: 'SET_LOADING'
    })
  }
}