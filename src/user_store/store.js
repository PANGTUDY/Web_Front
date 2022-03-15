import axios from 'axios'
import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';
import * as Api from '@/api/conference';
import { reject } from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        user: null,
        calendar: {},
        current_year: null,
        accessToken: null,
        refreshToken: null
        
    },
    getters:{
       loggedIn(state){
           return !!state.user
       },
       loginInfo(state){
           if(state.user){
               return state.user.name
           }else{
                return ''
           }
           
       },
       getToken(state){
            let ac = VueCookies.get('accessToken');
            let rf = VueCookies.get('refreshToken');
            return {
                access: ac,
                refresh: rf
            }
       },
       userInfo(state){
            return state.user
       },
        get_calendar(state) {
            return state.calendar;
        },
        loggedout(state){
            return state.user = null;
        }
    },
    mutations:{
        LOGIN_TOKEN(state,payload){
            // console.log(payload);
            VueCookies.set('accessToken',payload.accessToken,'60s');
            VueCookies.set('refreshToken',payload.refreshToken,'1h');
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
        },
        REFRESH_TOKEN(state,payload){ // accessToken 재셋팅
            VueCookies.set('accessToken',payload.accessToken,'60s');
            VueCookies.set('refreshToken', payload.refreshToken,'1h');
            state.accessToken = payload;
        },
        SET_USER_DATA(state,userData){
            state.user = userData;
            localStorage.setItem('user',JSON.stringify(userData));
            axios.defaults.headers.common['Authorization']=`Bearer${userData.salt}`
        },
        LOGOUT(state){
            VueCookies.remove('accessToken');
            VueCookies.remove('refreshToken');
            state.user = null;
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
            return axios.post('http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/signup',credentials)
            .then(({data})=>{
                commit('SET_USER_DATA',data)
                
            })
        },
        login({commit},credentials){
            return new Promise((resolve,reject) => {
                axios.post('http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/login',credentials)
            .then((response)=>{
                console.log(response.headers);
                commit('LOGIN_TOKEN',response.data);
                resolve(response);
            }).catch(err=>{
                console.log(err.message);
                reject(err.message);
            });
            })
           
        },
        refreshToken: ({commit},credentials)=>{
            return new Promise((resolve,reject)=>{
                axios.post('http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/token',credentials).
            then(({response})=>{
                console.log(response.data);
                commit('REFRESH_TOKEN',response.data);
                resolve(response);
            }).catch(err =>{
                console.log(err);
                // console.log('refreshToken error:', err.config);
                // reject(err.config.data);
            })
            })
        },
        logout({commit}){
            commit('LOGOUT')
            // location.reload();
        },
        allMembers(payload){
            return axios.get('http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/users',payload).
            then(({response}) =>{
                console.log(response);
            })
        },
        verifyEmail(payload){
            return axios.get('http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/verify',payload).
            then(({response})=>{
                console.log(response);
            })
        },
        memberInfo({commit},payload){
                return axios.get('http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/users/',{
                    params:{email: payload}
                })
                .then(({data})=>{
                    console.log(data);
                })
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