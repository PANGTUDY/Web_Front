import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';
import * as Api from '@/api/conference';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        user: null,
        calendar: {},
        current_year: null,
    },
    getters:{
        loggedIn(state){
            return !!state.user
        }
    },
    mutations:{
        SET_USER_DATA(state, userData){
            state.user = userData;
            localStorage.setItem('user',JSON.stringify(userData));
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
        },
        LOGOUT(state){
            state.user = null;
            localStorage.removeItem('user')
            location.reload();
        },
        LOAD_CALENDAR(state, payload) {
            // 백엔드에서 받아온 calendar 를 날짜별로 Dictionary 에 저장
            state.calendar = {};
            payload.calendar.forEach(element => {
                var date = element.year + '-' + element.month + '-' + element.day;
                if (date in state.calendar) 
                    state.calendar[date].push(element);
                else
                    state.calendar[date] = [element];
            });
            console.log(state.calendar);
            state.current_year = payload.year;
        },
        CREATE_CALENDAR(state, payload) {
            var date = payload.schedule.year + '-' + payload.schedule.month + '-' + payload.schedule.day;
            if (date in state.calendar) 
                state.calendar[date].push(payload.schedule);
            else
                state.calendar[date] = [payload.schedule];
        },
        UPDATE_CALENDAR(state, payload) {
           var date = payload.schedule.year + '-' + payload.schedule.month + '-' + payload.schedule.day;
           var update_id = state.calendar[date].findIndex(schedule => schedule.id === payload.schedule.id);
           state.calendar[date][update_id] = payload.schedule;
        }
        
    },
    actions:{
        register({commit},credentials){
            return axios.post('//localhost:3000/register',credentials)
            .then(({data})=>{
                console.log('user data is', data)
                commit('SET_USER_DATA',data)
            })
        },
        login({commit},credentials){
            return axios.post('//localhost:3000/login',credentials)
            .then(({data})=>{
                commit('SET_USER_DATA',data)
            })
        },
        logout({commit}){
            commit('LOGOUT')
        },
        async load_calendar({ commit }, year) {
            const calendar = await Api.get_calendar(year);
            commit("LOAD_CALENDAR", { year: year, calendar: calendar.data });
        },
        add_schedule({commit}, schedule) {
            commit('CREATE_CALENDAR', { schedule: schedule });
        },
        call_calendar_event({commit}, event_data) {
            switch (event_data.type) {
                case 'CREATE':
                    commit('CREATE_CALENDAR', { schedule: event_data.schedule });
                    break;
                case 'MODIFY':
                    commit('UPDATE_CALENDAR', { schedule: event_data.schedule });
                    break;
            }
        }
    }
    
})