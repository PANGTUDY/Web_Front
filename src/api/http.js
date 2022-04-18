import axios from "axios";


export const conference_instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/conference/'
});

export const auth_instance = axios.create({
    baseURL: 'http://ec2-54-242-72-201.compute-1.amazonaws.com:8080/auth/'
});

export const boardInstance = axios.create({
    baseURL: 'http://127.0.0.1:10831'
});
