import axios from 'axios';

const instance = axios.create({
    baseUrl:'http://localhost:3000/',
    timeout: 1000
});

instance.interceptors.request.use(
    function(config){
        config.headers["content-Type"] = "application/json; charset=utf-8";
        const token = VueCookies.get('accessToken');
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    function(error){
        console.log(error);
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    function(response){
        try{
            return response;
        }catch(error){
            console.error('[axios.interceptors.response] response', error.message);
        }
    },
    async function(error){
        console.log(error);
    }
)

export default instance;