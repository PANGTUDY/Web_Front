import axios from 'axios';
import * as AuthApi from '@/api/auth';
import { user_instance } from '../api/http';
import * as UserApi from '@/api/user';
import { createLogger } from 'vuex';
import {
    LOGIN_TOKEN,
    AUTH_EMAIL,
    REFRESH_TOKEN,
    LOGOUT,
    MODIFY_USER,
    GET_ALL_USERS
} from './types';

export default{
    register({commit},payload){
        return axios.post('http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/signup',payload)
        .then(({data}) => {
            // commit('SET_USER_DATA',data)
          return data;
        })
    },
    login: async ({commit},payload) => {
         let result ={};
         const {email,password} = payload;
         try{
             const url = 'http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/login';
             const result =await axios.post(url,{email,password});
             commit(LOGIN_TOKEN,result.data);
         }catch(error){
             console.warn(error.message,error);
         }finally{
            
         }
    },
    refreshToken: async ({},payload) => {
       let result ={};
       try{
           console.log('payload',payload);
           const url='http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/token';
           const headers = {'Authorization':`Bearer ${payload}`};
           const {data} = await axios.post(url,{headers},payload);
           result = data;
       }catch(error){
           console.warn(error.message,error);
       }finally{
            commit(REFRESH_TOKEN,result);
       }
       return result;
    },
    logout({commit}){
        commit(LOGOUT);
    },
    leftMember: async ({},payload) =>{
        let result = {};
        const {accessToken,email} = payload;
        try{
            const url='http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/users/'+email;
            const headers ={'Authorization':`Bearer ${accessToken}`};
            const {data} = await user_instance.delete(url,{headers});
            result = data;
            console.log(data);
        }catch(error){
            console.warn(error.message,error);
        }finally{

        }
        return result;
    },
    allMembers: async ({commit}, payload)=>{
        let result= {};
        try{
            const url= 'http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/users';
            const headers = {'Authorization': `Bearer ${payload}`};
            const {data} = await user_instance.get(url,{headers},payload);
            result = data;
            console.log(result);
        }catch(error){
            console.warn(error.message,error);
        }finally{
            commit(GET_ALL_USERS,result);
        }
    },
    verifyEmail(payload){
        return axios.get('http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/verify',payload).
        then(({response})=>{
            console.log(response);
        })
    },
    authEmail: async ({commit},payload) =>{
        let result ={};
        console.log('payload',payload);
        try{
            const url='http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/me';
            const headers =  {'Authorization':`Bearer ${payload}`};
            const {data} = await user_instance.get(url,{headers},payload);
            result = data;
            console.log(result);
        }catch(error){
            console.warn(error.message,error);
        }finally{
            commit(AUTH_EMAIL,result);
        }
    },
    modifyUser: async({commit},payload) =>{
        let result ={};
        console.log(payload);
        const {email,name,password,accessToken}=payload;
        console.log('email',email);
        console.log('password',password);
        console.log('accessToken',accessToken);
        try{
            const url='http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/users/'+email;
            // const headers = {'Authorization': `Bearer ${accessToken}`};
            user_instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
            const {data} = await user_instance.put(url,{name: name,email:email});
            result = data;
            console.log(result);
        }catch(error){
            console.warn(error.message,error);
        }finally{
            commit(MODIFY_USER,result);
        }
        return result;
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
};
