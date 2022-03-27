import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';
import * as Api from '@/api/conference';
import { reject } from 'lodash';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});