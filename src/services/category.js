import Api from './api';

const getCategories = (userId, holderId) => {
    return Api.get(`categories?caller.id=${userId}&holder.id=${holderId}`, {
        headers: {
            'Authorization': localStorage.getItem('ACCESS_TOKEN'),
        }
    });
}

const getCategory = (userId, holderId, id) => {
    return Api.get(`categories/${id}?caller.id=${userId}&holder.id=${holderId}`, {
        headers: {
            'Authorization': localStorage.getItem('ACCESS_TOKEN'),
        }
    });
}

const createCategory = (userId, holderId, category) => {
    return Api.post(`categories?caller.id=${userId}&holder.id=${holderId}`, category, {
        headers: {
            'Authorization': localStorage.getItem('ACCESS_TOKEN'),
        }
    });
};

const updateCategory = (userId, holderId, category) => {
    return Api.put(`categories?caller.id=${userId}&holder.id=${holderId}`, category, {
        headers: {
            'Authorization': localStorage.getItem('ACCESS_TOKEN'),
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
