import Api from './api';

const getCategories = (userId) => {
    return Api.get(`categories?caller.id=${userId}`);
}

const getCategory = (userId, id) => {
    return Api.get(`categories/${id}?caller.id=${userId}`);
}

const categoryServices = {
    getCategories,
    getCategory,
};

export default categoryServices;
