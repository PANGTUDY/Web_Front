import axios from 'axios';
import Vue from 'vue';
import VueCookies from 'vue-cookies';
import store from '@/user_store/index.js';

axios.defaults.baseURL='http://localhost:3000';


axios.interceptors.request.use(
   function(config){
    console.log('axios interceptor');
        let access = store.state.accessToken;
        // config의 url 정보가 로그인url과 회원가입url 정보와 같으면 header에 authorization 정보를 포함하지 않는다.
        if(config.url ==='http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/login' || config.url==='http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/signup'){
                return config;
        }else{
          if(!_.isEmpty(access)){
            console.log('있다',access);
            config.headers['Authorization'] = 'Bearer '+access;
        }
    }
        config.headers['content-Type'] = 'application/json';

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
        if(refresh != null && access == null){
            return store.dispatch('refreshToken',refresh).then(result =>{
                    console.log('status',result.status);
                    store.state.accessToken = result.data;
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+store.state.accessToken;
                    return axios(originalReq);
                
            })
        }
    return Promise.reject(error);
    })

    

export default axios;