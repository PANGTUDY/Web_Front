// import axios from "axios";
// import VueCookies from 'vue-cookies';

// export const login = {
//     state:{
//         accessToken:null,
//         refreshToken:null
//     },
//     mutations:{
//         loginToken(state,payload){
//             VueCookies.set('accessToken',payload.accessToekn);
//             VueCookies.set('refreshToken',payload.refreshToken);
//             state.accessToken = payload.accessToken;
//             state.refreshToken = payload.refreshToken;
//         }

//     },
//     getters:{
//         getToken(state){
//             let ac = VueCookies.get('accessToken');
//             let rf = VueCookies.get('refreshToken');
//             return {
//                 access: ac,
//                 refresh: rf
//             };
//         }
//     },
//     actions: {
//         login:({commit},params) =>{
//             return new 
//         }
//     }
// }