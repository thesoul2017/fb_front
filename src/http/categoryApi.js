import {$authHost} from "./index";

export const fetchCategories = async () => {
    const {data} = await $authHost.get('api/category');
    return data;
}
