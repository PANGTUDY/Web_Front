import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutation'

Vue.use(Vuex)

const state = {
  uid: '',
  errorState: '',
  isAuth: false
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})