import {$host, $authHost} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, first_name, last_name) => {
    const {data} = await $host.post('api/user/registration', {email, password, first_name, last_name});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const updateUser = async (id, first_name, last_name) => {
    const {data} = await $authHost.put('api/user/update', {id, first_name, last_name});
    return data;
}
