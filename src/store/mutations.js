import Vue from "vue";
import {
  LOGIN_TOKEN,
  AUTH_EMAIL,
  REISSUE_TOKEN,
  LOGOUT,
  MODIFY_USER,
  GET_ALL_USERS,
  SET_VALUE,
  ALERT_POP_UP,
} from "./types.js";

export default {
  [ALERT_POP_UP]: (staet, payload) => {
    state.message = payload.message;
    state.isPopupShow = payload.isPopupShow;
  },
  [SET_VALUE]: (state, payload) => {
    Object.entries(payload).forEach(([key, value]) => (state[key] = value));
  },
  [LOGIN_TOKEN]: (state, payload) => {
    // token 복호화
    let base64Access = payload.accessToken
      ? payload.accessToken.split(".")[1]
      : "";
    let base64 = base64Access.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    const obj = JSON.parse(jsonPayload);
    console.log("obj", obj);
    // 토큰 만료시간을 확인한다.
    state.timeout = obj.exp;

    state.user = { name: obj.name, email: obj.email, id: obj.id };
    // VueCookies.set('accessToken',payload.accessToken,'60s');
    // VueCookies.set('refreshToken',payload.refreshToken,'1h');
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
    state.isLogin = true;

    let base64AnotherAccess = payload.refreshToken
      ? payload.refreshToken.split(".")[1]
      : "";
    let base64Another = base64AnotherAccess
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    let jsonPayloadAnother = decodeURIComponent(
      atob(base64Another)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    const objAnother = JSON.parse(jsonPayloadAnother);
    state.refreshTimeOut = objAnother.exp;
    //    state.refreshTimeOut =1650347494984;
  },
  [AUTH_EMAIL]: (state, payload) => {
    state.authInfo = payload;
  },
  [REISSUE_TOKEN]: (state, payload) => {
    // accessToken 재셋팅

    let base64Access = payload.data.accessToken
      ? payload.data.accessToken.split(".")[1]
      : "";
    let base64 = base64Access.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    console.log("json", jsonPayload);
    const obj = JSON.parse(jsonPayload);
    // const obj = jsonPayload;
    state.timeout = obj.exp;
    // 토큰 만료시간을 확인한다.
    console.log("obj", obj);

    state.accessToken = payload.data.accessToken;

    // VueCookies.set('accessToken',payload,'1m');
  },
  [LOGOUT]: (state, payload) => {
    console.log("타니");
    state.user = payload;
    state.isLogin = false;
    state.accessToken = "";
    state.refreshToken = "";
    state.timeout = "";
    state.refreshTimeOut = "";
    // VueCookies.remove('accessToken');
    // VueCookies.remove('refreshToken');
  },
  [MODIFY_USER]: (state, payload) => {
    state.user = payload;
  },
  [GET_ALL_USERS]: (state, payload) => {
    state.allUsers = payload;
  },
  LOAD_CALENDAR(state, payload) {
    // 백엔드에서 받아온 calendar 를 날짜별로 Dictionary 에 저장
    state.calendar = {};
    payload.calendar.forEach(element => {
      var date = element.year + "-" + element.month + "-" + element.day;
      if (date in state.calendar) state.calendar[date].push(element);
      else state.calendar[date] = [element];
    });
    state.current_year = payload.year;
  },
  CREATE_SCHEDULE(state, payload) {
    var date =
      payload.schedule.year +
      "-" +
      payload.schedule.month +
      "-" +
      payload.schedule.day;
    if (date in state.calendar) {
      var temp_schedules = state.calendar[date];
      for (var index = 0; index < state.calendar[date].length; ++index) {
        if (
          state.calendar[date][index]["startTime"][0] * 60 +
            state.calendar[date][index]["startTime"][1] >
          payload.schedule.startTime[0] * 60 + payload.schedule.startTime[1]
        ) {
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
      var delete_index = state.calendar[date].findIndex(
        schedule => schedule.id === payload.id,
      );
      if (delete_index !== -1) {
        var temp_schedules = state.calendar[date];
        temp_schedules.splice(delete_index, 1);
        Vue.delete(state.calendar, date);
        Vue.set(state.calendar, date, temp_schedules);
        break;
      }
    }
  },
};
