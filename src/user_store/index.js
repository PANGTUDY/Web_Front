import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';
import * as Api from '@/api/conference';
import { reject } from 'lodash';
import createPersistedState from 'vuex-persistedstate';
import state from './state.js';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export * from './types';
export default new Vuex.Store({
    plugins:[createPersistedState()],
    state,
    getters,
    mutations,
    actions
});