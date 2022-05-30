import axios from "axios";
import store from "@/store/index.js";
import { reissue } from "./auth";
import VueCookies from "vue-cookies";

export const conference_instance = axios.create({
  baseURL: "http://127.0.0.1:8000/conference/",
});

export const auth_instance = axios.create({
  baseURL: "http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/",
});

// export const user_instance = axios.create({
//     baseURL: 'http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/'
// });

// user_instance.interceptors.request.use(
//     function(config){
//         console.log('axios interceptor');
//         // let token = store.getters.getToken;
//         let access = VueCookies.get('accessToken');
//         // config의 url 정보가 로그인url과 회원가입url 정보와 같으면 header에 authorization 정보를 포함하지 않는다.

//         if(!_.isEmpty(access)){
//             console.log('있다',access);
//             config.headers['Authorization'] = 'Bearer '+ access;
//         }
//         config.headers['content-Type'] = 'application/json';
//         return config;
//     },
//     function(error){
//         console.log(error);
//         return Promise.reject(error);
//     }
// );

//  user_instance.interceptors.response.use(
//     function(response){
//         return response;
//     },
//     function(error){
//         const originalReq = error.config;

//         let token = store.getters.getToken;

//         console.log('token',token);
//         console.log('timeout',store.state.timeout * 1000 <= Date.now());
//         // let refresh = VueCookies.get('refreshToken');
//         // let access = VueCookies.get('accessToken');

//         if (store.state.timeout * 1000 <= Date.now()){
//             return reissue(token.refresh).then(result => {
//                 console.log('data',result);
//                 console.log('status', result.status);
//                 store.state.accessToken = result.data.accessToken;
//                 // VueCookies.set('accessToken',result.data.accessToken,'60s');
//                 user_instance.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.accessToken;
//                 return axios(originalReq);
//             });
//         }
//         return Promise.reject(error);
//     }
// );

export const boardInstance = axios.create({
  baseURL: "http://127.0.0.1:10831",
});
