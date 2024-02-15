import {$authHost} from "./index";

export const createGroup = async (code) => {
    const {data} = await $authHost.post('api/group', {code});
    return data;
}

export const addUserToGroup = async (userId, groupId) => {
    const {data} = await $authHost.post('api/group/add-user', {userId, groupId});
    return data;
}

export const removeUserFromGroup = async (id) => {
    const {data} = await $authHost.delete('api/group/remove-user/' + id);
    return data;
}

export const findGroupByCode = async (code) => {
    const {data} = await $authHost.post('api/group/find-group-by-code', {code});
    return data;
}

export const findGroupByUser = async (userId) => {
    const {data} = await $authHost.post('api/group/find-group-by-user', {userId});
    return data;
}

export const findUsersInGroup = async (userId) => {
    const {data} = await $authHost.post('api/group/find-users-in-group', {userId});
    return data;
}

