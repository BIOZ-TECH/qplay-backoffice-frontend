import Api from './api';
import { getUserIdentifiers } from '../helpers/user';

const getCategories = () => {
    const { accessToken, holderId } = getUserIdentifiers();

    return Api.get(`categories?holder.id=${holderId}`, {
        headers: {
            'Authorization': accessToken,
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
}

const getCategory = (id) => {
    const { accessToken, holderId } = getUserIdentifiers();

    return Api.get(`categories/${id}?holder.id=${holderId}`, {
        headers: {
            'Authorization': accessToken,
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
}

const createCategory = (category) => {
    const { accessToken, holderId } = getUserIdentifiers();

    return Api.post(`categories?holder.id=${holderId}`, category, {
        headers: {
            'Authorization': accessToken,
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
};

const updateCategory = (category) => {
    const { accessToken, holderId } = getUserIdentifiers();

    return Api.put(`categories?holder.id=${holderId}`, category, {
        headers: {
            'Authorization': accessToken,
            "Accept": 'application/json',
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": '*',
        }
    });
};

const categoryServices = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
};

export default categoryServices;
