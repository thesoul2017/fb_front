import {$authHost} from "./index";

export const addBudget = async (sum, date, description, type, categoryId, userId) => {
    const {data} = await $authHost.post('api/budget', {sum, date, description, type, categoryId, userId});
    return data;
}

export const delBudget = async (id) => {
    const {data} = await $authHost.delete('api/budget/delete/' + id);
    return data;
}

export const updateBudget = async (item) => {
    const {data} = await $authHost.put('api/budget/update', item);
    return data;
}

export const fetchBudget = async (userId, page, limit, sort, filter) => {
    const {data} = await $authHost.post('api/budget/get', {userId, page, limit, sort, filter});
    return data;
}

export const fetchBudgetGroupByType = async (userId, filter) => {
    const {data} = await $authHost.post('api/budget/group-by-type', {userId, filter});
    return data;
}

export const fetchBudgetGroupByDate = async (userId, filter) => {
    const {data} = await $authHost.post('api/budget/group-by-date', {userId, filter});
    return data;
}

export const fetchBudgetGroupByCategory = async (userId, filter) => {
    const {data} = await $authHost.post('api/budget/group-by-category', {userId, filter});
    return data;
}
