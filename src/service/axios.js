import axios from 'axios';
import VueCookies from 'vue-cookies';
import store from './user_store/store.js';

axios.defaults.baseUrl = 'http://localhost:3000';

// Add a request interceptor
axios.interceptors.request.use(async function(config){
    //Do something before request is sent
    config.timeout = 10000;
    config.headers['x-access-token'] = VueCookies.get('accessToken');
    config.headers['x-refresh-token'] = VueCookies.get('refreshToken');
    config.headers['Content-Type'] = 'application/json';
    console.log(config);
    return config;
}, function(error){
    console.log('axios request error: ',error);
    return Promise.reject(error);
});

// response 설정
axios.interceptors.response.use(
    function(response){
        try{
            return response;
        }catch(err){
            console.error('[axios.interceptors.response] response: ', err.message);
        }
    },
    async function(error){
        try{
            // 에러에 대한 response 정보
            const errorAPI = error.response.config;// 요청했던 request 정보가 담겨있음
            if(error.response.status == 401 && errorAPI.retry == undefined && VueCookies.get('refreshToken') !=null){
                errorAPI.retry = true;
                const cookies = {"refreshToken":VueCookies.get('refreshToken') };
                await store.dispatch('refreshToken',{refreshToken:VueCookies.get('refreshToken')});
                return await axios(errAPI);
            }
            } catch(err){
                console.error('[axios.interceptors.response] error :', err.message);
            }
            return Promise.reject(error);
        }
    )