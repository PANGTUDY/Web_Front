import axios from 'axios';
import Vue from 'vue';
import VueCookies from 'vue-cookies';
import store from '@/user_store/index.js';

axios.defaults.baseURL='http://localhost:3000';


axios.interceptors.request.use(
   function(config){
    console.log('axios interceptor');
        let access = store.state.accessToken;
        if(access){
            config.headers['Authorization'] = 'Bearer '+access;
        }
        return config;
    },
    function(error){
        console.log(error);
        return Promise.reject(error);
    }
)

axios.interceptors.response.use(
    function(response){
        return response;
    },
    function(error){
        const originalReq = error.config;
        let refresh = store.state.refreshToken;
        let access = store.state.accessToken;
        if(error.response.status === 401 || (refresh != null && access == null)){
            return store.dispatch('refreshToken',refresh).then(result =>{
                if(result.status === 201){
                    console.log('status',result.status);
                    store.state.accessToken = result.data;
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+store.state.accessToken;
                    // 원래 함수 실행 이거 맞나...?
                    return axios(originalReq);
                }
            })
        }
    return Promise.reject(error);
    })

    

export default axios;