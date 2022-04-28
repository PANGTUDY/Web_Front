import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';
import * as Api from '@/api/conference';
import { reject } from 'lodash';
import { createPersistedstate } from '../assets/js/utils.js';
import state from './state.js';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export * from './types';
export default new Vuex.Store({
    plugins: process.env.NODE_ENV !== 'production' ? [createPersistedstate()] : [createPersistedstate()],
    state,
    getters,
    mutations,
    actions
});