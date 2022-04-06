import axios from 'axios';
import vueCookies from 'vue-cookies';
import {
    LOGIN_TOKEN,
    AUTH_EMAIL,
    REFRESH_TOKEN,
    LOGOUT,
    MODIFY_USER
} from './types';
export default{
    register({commit},payload){
        return axios.post('http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/signup',payload)
        .then(({data})=>{
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
             console.log('들어가니');
             console.log(result.data);
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
           result =data;
           console.log(result);
       }catch(error){
           console.warn(error.message,error);
       }finally{
            commit(REFRESH_TOKEN,result);
       }
       return result;
    },
    // refreshToken: ({},payload) => {
    //     const headers = {'Authorization':`Bearer ${payload}`};
    //     return new Promise((resolve,reject) =>{
    //         axios.post('http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/token',
    //         {headers},
    //         payload).then(res =>{
    //             console.log('결과',res);    
    //             commit(REFRESH_TOKEN,res);
    //         }).catch(error=>{
    //             console.log(error.config);
    //             reject(error.config.data);
    //         })
        
    //     })
           
    //  },
    logout({commit}){
        commit(LOGOUT);
        // location.reload();
    },
    allMembers(payload){
        return axios.get('http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/users',{parmas:payload}).
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
    modifyUser: async({commit},payload) =>{
        let result ={};
        console.log(payload);
        const {email,name,password,accessToken}=payload;
        try{
            const url='http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/users';
            const headers = {'Authorization': `Bearer ${accessToken}`};
            const {data} = await axios.put(url+email,{headers},{params:name,password});
            result = data;
            console.log(result);
        }catch(error){
            console.warn(error.message,error);
        }finally{
            commit(MODIFY_USER,result);
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
