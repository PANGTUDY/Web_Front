import axios from "axios";
import store from "@/user_store/store";

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
    async function(config) {
        const token = store.getters.getToken;
        var accessToken = token.accessToken;

        if (accessToken === null || token.accessTokenExp < Math.floor(+ new Date() / 1000)) {
            if (token.refreshToken === null) {
                store.dispatch('logout');
            }
            await store.dispatch('reissue', token.refreshToken).then((newAccessToken) => {
                accessToken = newAccessToken;
            });
        }
        config.headers['Authorization'] = 'Bearer ' + accessToken;
        return config;
    }
);

export const boardInstance = axios.create({
    baseURL: 'http://127.0.0.1:10831'
});
