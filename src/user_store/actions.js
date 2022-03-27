import axios from 'axios';
export default{
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
