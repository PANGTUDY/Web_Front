import axios from 'axios';
import {
    LOGIN_TOKEN,
    AUTH_EMAIL
} from './types';
export default{
    register({commit},payload){
        return axios.post('http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/signup',payload)
        .then(({data})=>{
            // commit('SET_USER_DATA',data)
          return data;
        })
    },
     async login({commit},payload){
         let result ={};
         const {email,password} = payload;
         try{
             const url = 'http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/login';
             const result =await axios.post(url,{email,password});
             console.log(result.data);
             commit(LOGIN_TOKEN,result.data);
         }catch(error){
             console.warn(error.message,error);
         }finally{
            
         }
    },
    refreshToken: async ({},payload) => {
       let resut ={};
       try{
           const url='http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/token';
           const headers = {'Authorization':`Bearer ${payload}`};
           const {result} = await axios.post(url,headers,payload);
           console.log(result);
       }catch(error){
           console.warn(error.message,error);
       }finally{

       }
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
    authEmail: async ({commit},payload) =>{
        let result ={};
        console.log('payload',payload);
        try{
            const url='http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/me';
            const headers =  {'Authorization':`Bearer ${payload}`};
            const {data} = await axios.get(url,{headers},payload);
            result = data;
            console.log(result);
        }catch(error){
            console.warn(error.message,error);
        }finally{
            commit(AUTH_EMAIL,result);
        }
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
