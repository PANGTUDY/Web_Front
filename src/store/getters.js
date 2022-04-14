export default{
    loggedIn(state){
        return !!state.user
    },
    loginInfo(state){
        if (state.user) {
            return state.user.name
        } else {
            return ''
        }
    },
    getToken(state) {
        return {
            access: state.accessToken,
            refresh: state.refreshToken
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