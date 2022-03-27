import VueCookies from 'vue-cookies';

export default{
    loggedIn(state){
        return !!state.user
    },
    loginInfo(state){
        if(state.user){
            return state.user.name
        }else{
             return ''
        }
        
    },
    getToken(state){
         let ac = VueCookies.get('accessToken');
         let rf = VueCookies.get('refreshToken');
         return {
             access: ac,
             refresh: rf
         }
    },
    userInfo(state){
         return state.user
    },
     get_calendar(state) {
         return state.calendar;
     },
     loggedout(state){
         return state.user = null;
     }
}