import axios from 'axios';
import Vue from 'vue';
import VueCookies from 'vue-cookies';
import store from '@/user_store/index.js';

axios.defaults.baseURL='http://localhost:3000';


axios.interceptors.request.use(
   async function(config){
        const token = VueCookies.get('accessToken');
        console.log('axios interceptor');
        
        config.headers.Authorization = 'Bearer '+ token;
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
     async function(error){
        try{
        const errorAPI = error.response.config;
        let Token = VueCookies.get('refreshToken');
        
        let accessToken = VueCookies.get('accessToken');
        if(Token !== null && accessToken === null){
            let params ={
                refreshToken :Token
            }
           await store.dispatch('refreshToken',params);
            //return await axios(errorAPI);
            }
            // error.headers.Authorization = `Bearer ${token}`;
        
        
    }catch(error){
        console.error('[axios.interceptors.response] error',error.message);
    }
    return Promise.reject(error);
    })

export default axios;