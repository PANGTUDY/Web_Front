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
        },
        get_calendar(state) {
            return state.calendar;
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
            state.current_year = payload.year;
        },
        CREATE_SCHEDULE(state, payload) { 
            var date = payload.schedule.year + '-' + payload.schedule.month + '-' + payload.schedule.day;
            if (date in state.calendar) {
                var temp_schedules = state.calendar[date];
                for (var index = 0; index < state.calendar[date].length; ++index) {
                    if ((state.calendar[date][index]['startTime'][0] * 60) + state.calendar[date][index]['startTime'][1]
                             > (payload.schedule.startTime[0] * 60) + payload.schedule.startTime[1]) {
                        temp_schedules.splice(index, 0, payload.schedule);
                        break;
                    }
                    if (index === state.calendar[date].length - 1) {
                        temp_schedules.push(payload.schedule);
                        break;
                    }
                }
                Vue.delete(state.calendar, date);
                Vue.set(state.calendar, date, temp_schedules);
            } else {
                Vue.set(state.calendar, date, [payload.schedule]);
            }
        },
        DELETE_SCHEDULE(state, payload) {
            for (const date in state.calendar) {
                var delete_index = state.calendar[date].findIndex(schedule => schedule.id === payload.id);
                if (delete_index !== -1) {
                    var temp_schedules = state.calendar[date];
                    temp_schedules.splice(delete_index, 1);
                    Vue.delete(state.calendar, date);
                    Vue.set(state.calendar, date, temp_schedules);
                    break;
                }
            }
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
        load_calendar({ commit }, payload) {
            commit("LOAD_CALENDAR", { year: payload.year, calendar: payload.calendar});
        },
        change_schedule_event({ commit }, event_data) {
            switch (event_data.type) {
                case 'CREATE':
                    commit('CREATE_SCHEDULE', { schedule: event_data.schedule });
                    break;
                case 'MODIFY':
                    commit('DELETE_SCHEDULE', { id: event_data.schedule.id });
                    commit('CREATE_SCHEDULE', { schedule: event_data.schedule });
                    break;
                case 'DELETE':
                    commit('DELETE_SCHEDULE', { id: event_data.schedule.id });
                    break;
            }
        }
    }
    
})