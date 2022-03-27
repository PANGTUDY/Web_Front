import axios from 'axios';
export default{
     LOGIN_TOKEN(state,payload){
            // console.log(payload);
            VueCookies.set('accessToken',payload.accessToken,'60s');
            VueCookies.set('refreshToken',payload.refreshToken,'1h');
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
        },
        REFRESH_TOKEN(state,payload){ // accessToken 재셋팅
            VueCookies.set('accessToken',payload.accessToken,'60s');
            VueCookies.set('refreshToken', payload.refreshToken,'1h');
            state.accessToken = payload;
        },
        SET_USER_DATA(state,userData){
            state.user = userData;
            localStorage.setItem('user',JSON.stringify(userData));
            axios.defaults.headers.common['Authorization']=`Bearer${userData.salt}`
        },
        LOGOUT(state){
            VueCookies.remove('accessToken');
            VueCookies.remove('refreshToken');
            state.user = null;
        },
        LOAD_CALENDAR(state, payload) {
            // 백엔드에서 받아온 calendar 를 날짜별로 Dictionary 에 저장
            state.calendar = {};
            payload.calendar.forEach(element => {
                var date = element.year + '-' + element.month + '-' + element.day;
                if (date in state.calendar) 
                    state.calendar[date].push(element);
                else
                    state.calendar[date] = [element];
            });
            state.current_year = payload.year;
        },
        CREATE_SCHEDULE(state, payload) { 
            var date = payload.schedule.year + '-' + payload.schedule.month + '-' + payload.schedule.day;
            if (date in state.calendar) {
                var temp_schedules = state.calendar[date];
                for (var index = 0; index < state.calendar[date].length; ++index) {
                    if ((state.calendar[date][index]['startTime'][0] * 60) + state.calendar[date][index]['startTime'][1]
                             > (payload.schedule.startTime[0] * 60) + payload.schedule.startTime[1]) {
                        temp_schedules.splice(index, 0, payload.schedule);
                        break;
                    }
                    if (index === state.calendar[date].length - 1) {
                        temp_schedules.push(payload.schedule);
                        break;
                    }
                }
                Vue.delete(state.calendar, date);
                Vue.set(state.calendar, date, temp_schedules);
            } else {
                Vue.set(state.calendar, date, [payload.schedule]);
            }
        },
        DELETE_SCHEDULE(state, payload) {
            for (const date in state.calendar) {
                var delete_index = state.calendar[date].findIndex(schedule => schedule.id === payload.id);
                if (delete_index !== -1) {
                    var temp_schedules = state.calendar[date];
                    temp_schedules.splice(delete_index, 1);
                    Vue.delete(state.calendar, date);
                    Vue.set(state.calendar, date, temp_schedules);
                    break;
                }
            }
        }
}