import axios from "axios";
import store from "@/user_store/index.js";

export const conference_instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/conference/'
});

export const auth_instance = axios.create({
    baseURL: 'http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/'
});

export const user_instance = axios.create({
    baseURL: 'http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/'
});

user_instance.interceptors.request.use(
    function(config){
        console.log('axios interceptor');
        let token = store.getters.getToken;
        // let access = VueCookies.get('accessToken');
        // config의 url 정보가 로그인url과 회원가입url 정보와 같으면 header에 authorization 정보를 포함하지 않는다.

        if(!_.isEmpty(token.accessToken)){
            console.log('있다',token.accessToken);
            config.headers['Authorization'] = 'Bearer '+ token.accessToken;
        }
        config.headers['content-Type'] = 'application/json';
        return config;
    },
    function(error){
        console.log(error);
        return Promise.reject(error);
    }
);
 
 user_instance.interceptors.response.use(
    function(response){
        return response;
    },
    function(error){
        const originalReq = error.config;
        let token = store.getters.getToken;

        // let refresh = VueCookies.get('refreshToken');
        // let access = VueCookies.get('accessToken');
        if (token.refreshToken != null && token.accessToken == null){
            return store.dispatch('refreshToken', token.refreshToken).then(result => {
                console.log('status', result.status);
                store.state.accessToken = result.data;
                user_instance.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.accessToken;
                return axios(originalReq);
            });
        }
        return Promise.reject(error);
    }
);

export const boardInstance = axios.create({
    baseURL: 'http://127.0.0.1:10831'
});
