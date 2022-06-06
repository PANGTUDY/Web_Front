import axios from "axios";

import {
  LOGIN_TOKEN,
  AUTH_EMAIL,
  REISSUE_TOKEN,
  LOGOUT,
  MODIFY_USER,
  GET_ALL_USERS,
} from "./types";

export default {
  register: async ({}, payload) => {
    let result = {};
    try {
      console.log("payload", payload);
      const url = "/auth/signup";
      const { data } = await axios.post(url, payload);
      result = data;
    } catch (error) {
      result = error.response.data;
      console.warn(error);
    } finally {
    }
    return result;
  },
  login: async ({ commit }, payload) => {
    let result = {};
    const { email, password } = payload;
    try {
      const url = "/auth/login";
      const { data } = await axios.post(url, { email, password });
      result = data;
    } catch (error) {
      // 에러 처리
      result = error.response.data;
      console.warn(error.message, error);
    } finally {
      if (result.status !== "error") {
        commit(LOGIN_TOKEN, result.data);
      }
    }
    return result;
  },
  [REISSUE_TOKEN]: async ({ commit }, payload) => {
    let result = {};
    try {
      console.log("payload", payload);
      const url = "/auth/refresh";
      const headers = { Authorization: `Bearer ${payload}` };
      const { data } = await axios.post(url, payload, { headers });
      result = data;
    } catch (error) {
      result = error.response.data;
      console.warn(error.message, error);
    } finally {
      commit(REISSUE_TOKEN, result);
    }
    return result;
  },
  [LOGOUT]: async ({ commit }, payload) => {
    let result = {};
    try {
      const { refreshToken } = payload;
      const url = "/auth/logout";
      const headers = { Authorization: `Bearer ${refreshToken}` };
      const { data } = await axios.post(url, payload, { headers });
      result = data;
    } catch (error) {
      result = error.response.data;
      console.log("result", result);
      console.warn(error.message, error);
    } finally {
      commit(LOGOUT, result.data);
    }
    return result;
  },
  leftMember: async ({}, payload) => {
    let result = {};
    const { accessToken, id } = payload;
    console.log(payload);
    try {
      const url = "/users/" + id;
      const headers = { Authorization: `Bearer ${accessToken}` };
      const { data } = await axios.delete(url, { headers });
      result = data;
      console.log(data);
    } catch (error) {
      result = error.response.data;
      console.warn(error.message, error);
    } finally {
    }
    return result;
  },
  allMembers: async ({ commit }, payload) => {
    let result = {};
    console.log(payload);
    try {
      const url = "/users";
      const headers = { Authorization: `Bearer ${payload}` };
      const { data } = await axios.get(url, { headers }, payload);
      result = data;
      console.log(result);
    } catch (error) {
      console.warn(error.message, error);
    } finally {
      commit(GET_ALL_USERS, result.data);
    }
  },
  verifyEmail(payload) {
    return axios.get("/auth/verify", payload).then(({ response }) => {
      console.log(response);
    });
  },
  authEmail: async ({ commit }, payload) => {
    let result = {};

    const { accessToken, id } = payload;

    try {
      const url = `/users/${id}`;
      const headers = { Authorization: `Bearer ${accessToken}` };
      const { data } = await axios.get(url, { headers });
      result = data;
    } catch (error) {
      result = error.response.data;
      console.warn(error.message, error);
    } finally {
      commit(AUTH_EMAIL, result.data);
    }
    return result;
  },
  modifyUser: async ({ commit }, payload) => {
    let result = {};
    console.log(payload);
    const { email, name, password, accessToken } = payload;
    console.log("email", email);
    console.log("password", password);
    console.log("accessToken", accessToken);
    try {
      const url = "/users/" + email;
      // const headers = {'Authorization': `Bearer ${accessToken}`};
      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      const { data } = await axios.put(url, { name: name, email: email });
      result = data;
      console.log(result);
    } catch (error) {
      console.warn(error.message, error);
    } finally {
      commit(MODIFY_USER, result);
    }
    return result;
  },
  memberInfo({ commit }, payload) {
    return axios
      .get("/users", {
        params: { email: payload },
      })
      .then(({ data }) => {
        console.log(data);
      });
  },
  load_calendar({ commit }, payload) {
    commit("LOAD_CALENDAR", { year: payload.year, calendar: payload.calendar });
  },
  change_schedule_event({ commit }, event_data) {
    switch (event_data.type) {
      case "CREATE":
        commit("CREATE_SCHEDULE", { schedule: event_data.schedule });
        break;
      case "MODIFY":
        commit("DELETE_SCHEDULE", { id: event_data.schedule.id });
        commit("CREATE_SCHEDULE", { schedule: event_data.schedule });
        break;
      case "DELETE":
        commit("DELETE_SCHEDULE", { id: event_data.schedule.id });
        break;
    }
  },
};
